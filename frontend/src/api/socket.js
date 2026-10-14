// WebSocket helper: connects, authenticates with a first message,
// keeps the connection alive and reconnects with backoff.

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// http://host:8007/api/ -> ws://host:8007/
const WS_BASE = (() => {
  try {
    const url = new URL(API_BASE, window.location.href);
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    url.pathname = "/";
    url.search = "";
    return url.toString();
  } catch {
    return null;
  }
})();

const PING_MS = 25000;
const MAX_BACKOFF_MS = 30000;
const CLOSE_UNAUTHORIZED = 4401;

/**
 * @param {string} path      e.g. "ws/chat/"
 * @param {() => string|null} getToken  read fresh on every (re)connect
 * @param {(event: object) => void} onEvent
 * @param {(status: "connecting"|"live"|"offline") => void} [onStatus]
 * @returns {() => void} call to close for good
 */
export function connectSocket(path, getToken, onEvent, onStatus = () => {}) {
  if (!WS_BASE) return () => {};

  let ws;
  let ping;
  let retry;
  let attempts = 0;
  let stopped = false;

  const open = () => {
    const token = getToken();
    if (stopped || !token) return;

    onStatus("connecting");
    ws = new WebSocket(`${WS_BASE}${path}`);

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "auth", token }));
      ping = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: "ping" }));
        }
      }, PING_MS);
    };

    ws.onmessage = (e) => {
      let data;
      try {
        data = JSON.parse(e.data);
      } catch {
        return;
      }
      if (data.type === "pong") return;
      if (data.type === "ready") {
        attempts = 0;
        onStatus("live");
      }
      onEvent(data);
    };

    ws.onclose = (e) => {
      clearInterval(ping);
      onStatus("offline");
      // a rejected token won't get better by retrying
      if (stopped || e.code === CLOSE_UNAUTHORIZED) return;
      const delay = Math.min(1000 * 2 ** attempts++, MAX_BACKOFF_MS);
      retry = setTimeout(open, delay);
    };
  };

  open();

  return () => {
    stopped = true;
    clearTimeout(retry);
    clearInterval(ping);
    ws?.close();
  };
}
