"""Pushes message events to connected WebSocket clients via Redis."""

import logging

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from .consumers import OWNER_GROUP, conversation_group

logger = logging.getLogger(__name__)


def _send(group, event):
    layer = get_channel_layer()
    if layer is None:
        return
    try:
        async_to_sync(layer.group_send)(group, event)
    except Exception:  # noqa: BLE001 — a Redis outage must not break the API
        logger.warning("Real-time push to %s failed", group, exc_info=True)


def _unread_count():
    from .models import Conversation

    return Conversation.objects.filter(unread_by_owner=True).count()


def message_created(message):
    from .serializers import MessageSerializer

    data = dict(MessageSerializer(message).data)
    _send(
        conversation_group(message.conversation_id),
        {"type": "chat.message", "message": data},
    )
    _send(
        OWNER_GROUP,
        {
            "type": "inbox.update",
            "event": "message",
            "conversation_id": message.conversation_id,
            "message": data,
            "unread": _unread_count(),
        },
    )


def conversation_read():
    _send(
        OWNER_GROUP,
        {"type": "inbox.update", "event": "read", "unread": _unread_count()},
    )


def conversation_deleted(conversation_id):
    _send(conversation_group(conversation_id), {"type": "chat.deleted"})
    _send(
        OWNER_GROUP,
        {
            "type": "inbox.update",
            "event": "deleted",
            "conversation_id": conversation_id,
            "unread": _unread_count(),
        },
    )
