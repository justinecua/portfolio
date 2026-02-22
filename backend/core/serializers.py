from rest_framework import serializers
from .models import Skill, Project, Post, PostBlock

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    stack = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = "__all__"


class PostBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostBlock
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    content = PostBlockSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = "__all__"