from rest_framework import serializers
from .models import Skill, Project, Post, PostBlock, Certificate, Conversation, Message


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


IMAGE_EXTENSIONS = (".png", ".jpg", ".jpeg", ".webp", ".gif")
MAX_THUMBNAIL_BYTES = 5 * 1024 * 1024


class ProjectSerializer(serializers.ModelSerializer):
    stack = SkillSerializer(many=True, read_only=True)
    # set true to remove an uploaded thumbnail
    clear_thumbnail_file = serializers.BooleanField(
        write_only=True, required=False, default=False
    )
    # set true to remove an uploaded logo
    clear_logo_file = serializers.BooleanField(
        write_only=True, required=False, default=False
    )
    # admin writes the stack as a plain list of names
    stack_names = serializers.ListField(
        child=serializers.CharField(max_length=100),
        write_only=True,
        required=False,
    )

    class Meta:
        model = Project
        fields = "__all__"

    def validate_thumbnail_file(self, file):
        if file:
            if not file.name.lower().endswith(IMAGE_EXTENSIONS):
                raise serializers.ValidationError(
                    "Upload a PNG, JPG, WEBP or GIF image."
                )
            if file.size > MAX_THUMBNAIL_BYTES:
                raise serializers.ValidationError("Image must be 5 MB or smaller.")
        return file

    def validate_logo_file(self, file):
        return self.validate_thumbnail_file(file)

    def _set_stack(self, project, names):
        skills = [
            Skill.objects.get_or_create(name=name.strip())[0]
            for name in names
            if name.strip()
        ]
        project.stack.set(skills)

    def create(self, validated_data):
        names = validated_data.pop("stack_names", [])
        validated_data.pop("clear_thumbnail_file", None)
        validated_data.pop("clear_logo_file", None)
        project = super().create(validated_data)
        self._set_stack(project, names)
        return project

    def update(self, instance, validated_data):
        names = validated_data.pop("stack_names", None)
        for field in ("thumbnail_file", "logo_file"):
            clear = validated_data.pop(f"clear_{field}", False)
            if (clear or validated_data.get(field)) and getattr(instance, field):
                getattr(instance, field).delete(save=False)
        project = super().update(instance, validated_data)
        if names is not None:
            self._set_stack(project, names)
        return project


class PostBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostBlock
        fields = ["id", "type", "text", "order"]
        read_only_fields = ["id", "order"]


class PostSerializer(serializers.ModelSerializer):
    content = PostBlockSerializer(many=True, required=False)

    class Meta:
        model = Post
        fields = "__all__"

    def _set_blocks(self, post, blocks):
        post.content.all().delete()
        PostBlock.objects.bulk_create(
            PostBlock(post=post, type=b["type"], text=b["text"], order=i)
            for i, b in enumerate(blocks)
        )

    def create(self, validated_data):
        blocks = validated_data.pop("content", [])
        post = super().create(validated_data)
        self._set_blocks(post, blocks)
        return post

    def update(self, instance, validated_data):
        blocks = validated_data.pop("content", None)
        post = super().update(instance, validated_data)
        if blocks is not None:
            self._set_blocks(post, blocks)
        return post


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = "__all__"

    def validate(self, attrs):
        url = attrs.get("url", getattr(self.instance, "url", ""))
        file = attrs.get("file", getattr(self.instance, "file", None))
        if not url and not file:
            raise serializers.ValidationError(
                "Add a link to the certificate or upload its file."
            )
        return attrs


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["id", "sender", "body", "created_at"]
        read_only_fields = ["id", "sender", "created_at"]

    body = serializers.CharField(max_length=4000, trim_whitespace=True)


class VisitorConversationSerializer(serializers.ModelSerializer):
    """What the visitor sees of their own thread."""

    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ["name", "messages"]


class StartConversationSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100, trim_whitespace=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    body = serializers.CharField(max_length=4000, trim_whitespace=True)


class AdminConversationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    preview = serializers.SerializerMethodField()
    count = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = [
            "id",
            "name",
            "email",
            "unread_by_owner",
            "created_at",
            "updated_at",
            "preview",
            "count",
            "messages",
        ]

    def get_preview(self, obj):
        last = obj.messages.last()
        if not last:
            return ""
        prefix = "You: " if last.sender == "owner" else ""
        return prefix + last.body[:140]

    def get_count(self, obj):
        return obj.messages.count()
