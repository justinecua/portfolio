from django.contrib import admin
from .models import Skill, Project, Post, PostBlock


admin.site.register(Skill)
admin.site.register(Project)


class PostBlockInline(admin.TabularInline):
    model = PostBlock
    extra = 1


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "tag", "published_date")
    inlines = [PostBlockInline]