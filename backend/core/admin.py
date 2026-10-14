from django.contrib import admin
from .models import Skill, Project, Post, PostBlock, Certificate, Conversation, Message


admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(Certificate)


class MessageInline(admin.TabularInline):
    model = Message
    extra = 0


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "unread_by_owner", "updated_at")
    exclude = ("token",)
    inlines = [MessageInline]


class PostBlockInline(admin.TabularInline):
    model = PostBlock
    extra = 1


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "tag", "published_date")
    inlines = [PostBlockInline]