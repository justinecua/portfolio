from django.urls import path

from .consumers import OwnerInboxConsumer, VisitorChatConsumer

websocket_urlpatterns = [
    path("ws/chat/", VisitorChatConsumer.as_asgi()),
    path("ws/inbox/", OwnerInboxConsumer.as_asgi()),
]
