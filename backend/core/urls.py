from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AdminCertificateViewSet,
    AdminConversationViewSet,
    AdminPostViewSet,
    AdminProjectViewSet,
    CertificateListView,
    LoginView,
    LogoutView,
    MeView,
    PostDetailView,
    PostListView,
    ProjectListView,
    StartConversationView,
    VisitorConversationView,
)

router = DefaultRouter()
router.register("projects", AdminProjectViewSet, basename="admin-projects")
router.register("posts", AdminPostViewSet, basename="admin-posts")
router.register("certificates", AdminCertificateViewSet, basename="admin-certificates")
router.register("conversations", AdminConversationViewSet, basename="admin-conversations")

urlpatterns = [
    path("projects/", ProjectListView.as_view()),
    path("posts/", PostListView.as_view()),
    path("posts/<int:pk>/", PostDetailView.as_view()),
    path("certificates/", CertificateListView.as_view()),
    path("auth/login/", LoginView.as_view()),
    path("auth/logout/", LogoutView.as_view()),
    path("auth/me/", MeView.as_view()),
    path("chat/", StartConversationView.as_view()),
    path("chat/<str:token>/", VisitorConversationView.as_view()),
    path("manage/", include(router.urls)),
]
