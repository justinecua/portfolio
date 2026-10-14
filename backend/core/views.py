import secrets

from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework import generics, mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import AllowAny, BasePermission
from rest_framework.response import Response
from rest_framework.views import APIView

from . import realtime
from .models import Certificate, Conversation, Message, Post, Project
from .serializers import (
    AdminConversationSerializer,
    CertificateSerializer,
    MessageSerializer,
    PostSerializer,
    ProjectSerializer,
    StartConversationSerializer,
    VisitorConversationSerializer,
)


class IsSuperUser(BasePermission):
    """Only the site owner (a superuser account) may use the admin API."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_superuser)


# ── public, read-only ──────────────────────────────────────────────


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all().order_by("-created_at")
    serializer_class = ProjectSerializer


class PostListView(generics.ListAPIView):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer


class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CertificateListView(generics.ListAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer


# ── auth ───────────────────────────────────────────────────────────


class LoginView(APIView):
    permission_classes = [AllowAny]
    throttle_scope = "login"

    def post(self, request):
        user = authenticate(
            username=request.data.get("username", ""),
            password=request.data.get("password", ""),
        )
        # same message for wrong password and non-admin accounts
        if user is None or not user.is_superuser:
            return Response(
                {"detail": "Invalid username or password."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "username": user.username})


class LogoutView(APIView):
    permission_classes = [IsSuperUser]

    def post(self, request):
        Token.objects.filter(user=request.user).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MeView(APIView):
    permission_classes = [IsSuperUser]

    def get(self, request):
        return Response({"username": request.user.username})


# ── admin CRUD ─────────────────────────────────────────────────────


class AdminProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by("-created_at")
    serializer_class = ProjectSerializer
    permission_classes = [IsSuperUser]


class AdminPostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = [IsSuperUser]


class AdminCertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [IsSuperUser]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


# ── messages: visitor side ─────────────────────────────────────────


class StartConversationView(APIView):
    """A visitor sends their first message and gets a private thread key."""

    permission_classes = [AllowAny]
    throttle_scope = "chat"

    def post(self, request):
        data = StartConversationSerializer(data=request.data)
        data.is_valid(raise_exception=True)
        conversation = Conversation.objects.create(
            name=data.validated_data["name"],
            email=data.validated_data.get("email", ""),
            token=secrets.token_urlsafe(32),
        )
        message = Message.objects.create(
            conversation=conversation,
            sender="visitor",
            body=data.validated_data["body"],
        )
        realtime.message_created(message)
        return Response(
            {
                "token": conversation.token,
                "conversation": VisitorConversationSerializer(conversation).data,
            },
            status=status.HTTP_201_CREATED,
        )


class VisitorConversationView(APIView):
    permission_classes = [AllowAny]

    def get_throttles(self):
        # reading is free; only sending counts toward the limit
        self.throttle_scope = "chat" if self.request.method == "POST" else None
        return super().get_throttles()

    def get(self, request, token):
        conversation = get_object_or_404(Conversation, token=token)
        return Response(VisitorConversationSerializer(conversation).data)

    def post(self, request, token):
        conversation = get_object_or_404(Conversation, token=token)
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        message = serializer.save(conversation=conversation, sender="visitor")
        conversation.unread_by_owner = True
        conversation.save(update_fields=["unread_by_owner", "updated_at"])
        realtime.message_created(message)
        return Response(
            VisitorConversationSerializer(conversation).data,
            status=status.HTTP_201_CREATED,
        )


# ── messages: owner side ───────────────────────────────────────────


class AdminConversationViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Conversation.objects.prefetch_related("messages")
    serializer_class = AdminConversationSerializer
    permission_classes = [IsSuperUser]

    def retrieve(self, request, *args, **kwargs):
        conversation = self.get_object()
        if conversation.unread_by_owner:
            conversation.unread_by_owner = False
            # keep the inbox order: don't bump updated_at just for reading
            Conversation.objects.filter(pk=conversation.pk).update(unread_by_owner=False)
            realtime.conversation_read()
        return Response(self.get_serializer(conversation).data)

    def perform_destroy(self, instance):
        conversation_id = instance.id
        instance.delete()
        realtime.conversation_deleted(conversation_id)

    @action(detail=True, methods=["post"])
    def reply(self, request, pk=None):
        conversation = self.get_object()
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        message = serializer.save(conversation=conversation, sender="owner")
        conversation.unread_by_owner = False
        conversation.save(update_fields=["unread_by_owner", "updated_at"])
        realtime.message_created(message)
        # reload: the prefetched message list predates this reply
        return Response(
            self.get_serializer(self.get_object()).data,
            status=status.HTTP_201_CREATED,
        )

    @action(detail=False, methods=["get"])
    def unread(self, request):
        return Response(
            {"count": Conversation.objects.filter(unread_by_owner=True).count()}
        )
