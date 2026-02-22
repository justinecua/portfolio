from django.urls import path
from .views import ProjectListView, PostListView, PostDetailView

urlpatterns = [
    path("projects/", ProjectListView.as_view()),
    path("posts/", PostListView.as_view()),
    path("posts/<int:pk>/", PostDetailView.as_view()),
]