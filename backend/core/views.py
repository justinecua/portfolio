from rest_framework import generics
from .models import Project, Post
from .serializers import ProjectSerializer, PostSerializer


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all().order_by("-created_at")
    serializer_class = ProjectSerializer


class PostListView(generics.ListAPIView):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer


class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer