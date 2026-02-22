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