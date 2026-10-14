"""
ASGI config for portfolio project.

Serves regular HTTP through Django and WebSockets through Channels.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')

# initialise Django before importing anything that touches models
django_asgi_app = get_asgi_application()

from channels.routing import ProtocolTypeRouter, URLRouter  # noqa: E402
from channels.security.websocket import OriginValidator  # noqa: E402
from django.conf import settings  # noqa: E402

from core.routing import websocket_urlpatterns  # noqa: E402

# Only the site's own frontend may open sockets (same list as CORS).
allowed_origins = settings.CORS_ALLOWED_ORIGINS

application = ProtocolTypeRouter(
    {
        'http': django_asgi_app,
        'websocket': OriginValidator(URLRouter(websocket_urlpatterns), allowed_origins),
    }
)
