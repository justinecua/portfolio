from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=255)
    tag = models.CharField(max_length=100)
    description = models.TextField()
    stack = models.ManyToManyField(Skill, blank=True)
    site = models.URLField(blank=True)
    youtube = models.CharField(max_length=100, blank=True)
    thumbnail = models.URLField(blank=True)
    # an uploaded thumbnail wins over the URL and the YouTube thumbnail
    thumbnail_file = models.FileField(upload_to="projects/", blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Post(models.Model):
    title = models.CharField(max_length=255)
    tag = models.CharField(max_length=100)
    excerpt = models.TextField()
    read_time = models.CharField(max_length=50)
    published_date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class PostBlock(models.Model):
    BLOCK_TYPES = [
        ("p", "Paragraph"),
        ("h2", "Heading 2"),
        ("code", "Code"),
    ]

    post = models.ForeignKey(Post, related_name="content", on_delete=models.CASCADE)
    type = models.CharField(max_length=10, choices=BLOCK_TYPES)
    text = models.TextField()
    order = models.PositiveIntegerField()

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.post.title} - {self.type}"

class Certificate(models.Model):
    title = models.CharField(max_length=255)
    issuer = models.CharField(max_length=255)
    category = models.CharField(max_length=100, blank=True)
    # free text so ranges like "June 24-26, 2026" are possible
    date_label = models.CharField(max_length=100, blank=True)
    url = models.URLField(blank=True)
    file = models.FileField(upload_to="certificates/", blank=True)
    order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.title


class Conversation(models.Model):
    """A visitor's chat thread. The visitor reaches it with `token`."""

    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True)
    token = models.CharField(max_length=64, unique=True)
    unread_by_owner = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        return f"{self.name} ({self.created_at:%Y-%m-%d})"


class Message(models.Model):
    SENDERS = [
        ("visitor", "Visitor"),
        ("owner", "Owner"),
    ]

    conversation = models.ForeignKey(
        Conversation, related_name="messages", on_delete=models.CASCADE
    )
    sender = models.CharField(max_length=10, choices=SENDERS)
    body = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"{self.sender}: {self.body[:40]}"
