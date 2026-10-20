const API_BASE = import.meta.env.VITE_API_BASE_URL;

const store = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      if (value == null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    } catch {
      // storage unavailable - the thread just won't persist
    }
  },
};

export const getChatToken = () => store.get("chat_token");
export const setChatToken = (t) => store.set("chat_token", t);
export const getSeen = () => Number(store.get("chat_seen") || 0);
export const setSeen = (n) => store.set("chat_seen", String(n));

async function send(path, method = "GET", body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(
      res.status === 429
        ? "You’re sending messages too fast. Try again later."
        : data?.detail ||
            Object.values(data || {})
              .flat()
              .join(" ") ||
            "Something went wrong. Please try again.",
    );
    err.status = res.status;
    throw err;
  }
  return data;
}

export const startChat = (payload) => send("chat/", "POST", payload);
export const getChat = (token) => send(`chat/${token}/`);
export const sendChat = (token, body) =>
  send(`chat/${token}/`, "POST", { body });
