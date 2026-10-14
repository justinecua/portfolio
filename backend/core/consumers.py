"""WebSocket consumers for real-time messages.

Clients connect, then send {"type": "auth", "token": "..."} as their first
message. Tokens are never put in the URL so they don't end up in logs.
Writes still go through the REST API (validation + throttling); sockets
only push updates.
"""

import asyncio

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from rest_framework.authtoken.models import Token

from .models import Conversation

AUTH_TIMEOUT = 10  # seconds a client has to authenticate
CLOSE_UNAUTHORIZED = 4401

OWNER_GROUP = "owner_inbox"


def conversation_group(conversation_id):
    return f"chat_{conversation_id}"


class AuthFirstConsumer(AsyncJsonWebsocketConsumer):
    """Accepts the socket, then requires an auth message before anything else."""

    group = None

    async def connect(self):
        await self.accept()
        self._timeout = asyncio.create_task(self._close_if_unauthed())

    async def _close_if_unauthed(self):
        await asyncio.sleep(AUTH_TIMEOUT)
        if self.group is None:
            await self.close(code=CLOSE_UNAUTHORIZED)

    async def disconnect(self, code):
        if getattr(self, "_timeout", None):
            self._timeout.cancel()
        if self.group:
            await self.channel_layer.group_discard(self.group, self.channel_name)

    async def receive_json(self, content, **kwargs):
        kind = content.get("type")
        if kind == "ping":
            await self.send_json({"type": "pong"})
            return
        if kind != "auth" or self.group is not None:
            return

        group = await self.authenticate(str(content.get("token", "")))
        if group is None:
            await self.close(code=CLOSE_UNAUTHORIZED)
            return

        self.group = group
        self._timeout.cancel()
        await self.channel_layer.group_add(group, self.channel_name)
        await self.send_json({"type": "ready"})

    async def authenticate(self, token):
        raise NotImplementedError


class VisitorChatConsumer(AuthFirstConsumer):
    """A visitor listening for replies in their own conversation."""

    @database_sync_to_async
    def authenticate(self, token):
        conversation = Conversation.objects.filter(token=token).only("id").first()
        return conversation_group(conversation.id) if conversation else None

    async def chat_message(self, event):
        await self.send_json({"type": "message", "message": event["message"]})

    async def chat_deleted(self, event):
        await self.send_json({"type": "deleted"})
        await self.close()


class OwnerInboxConsumer(AuthFirstConsumer):
    """The site owner's admin inbox."""

    @database_sync_to_async
    def authenticate(self, token):
        found = Token.objects.select_related("user").filter(key=token).first()
        if found and found.user.is_active and found.user.is_superuser:
            return OWNER_GROUP
        return None

    async def inbox_update(self, event):
        await self.send_json(
            {
                "type": "inbox",
                "event": event["event"],
                "conversation_id": event.get("conversation_id"),
                "message": event.get("message"),
                "unread": event["unread"],
            }
        )
