import { useCallback, useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";
import {
  getChat,
  getChatToken,
  getSeen,
  sendChat,
  setChatToken,
  setSeen,
  startChat,
} from "../../api/chat";
import { connectSocket } from "../../api/socket";
import profile from "../../assets/profile.jpeg";

const FALLBACK_POLL_MS = 30000;

const formatTime = (iso) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

// add a message unless we already have it (the REST response and the
// socket echo can both deliver the same one)
const withMessage = (thread, message) =>
  !thread || thread.messages.some((m) => m.id === message.id)
    ? thread
    : { ...thread, messages: [...thread.messages, message] };

const ownerCount = (thread) =>
  thread?.messages.filter((m) => m.sender === "owner").length || 0;

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(getChatToken);
  const [thread, setThread] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", body: "" });
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [live, setLive] = useState(false);
  const listRef = useRef(null);

  const reset = useCallback(() => {
    setChatToken(null);
    setToken(null);
    setThread(null);
  }, []);

  const refresh = useCallback(async () => {
    if (!token) return;
    try {
      setThread(await getChat(token));
    } catch (err) {
      // the thread was deleted on the server — start fresh
      if (err.status === 404) reset();
    }
  }, [token, reset]);

  // live updates: replies arrive over the socket as soon as they're sent
  useEffect(() => {
    if (!token) return;
    refresh();
    return connectSocket(
      "ws/chat/",
      () => token,
      (event) => {
        // reconnected — fetch the thread to catch anything missed
        if (event.type === "ready") refresh();
        if (event.type === "message")
          setThread((t) => withMessage(t, event.message));
        if (event.type === "deleted") reset();
      },
      (status) => setLive(status === "live"),
    );
  }, [token, refresh, reset]);

  // fallback if sockets are blocked or the server is unreachable
  useEffect(() => {
    if (!open || live || !token) return;
    const id = setInterval(refresh, FALLBACK_POLL_MS);
    return () => clearInterval(id);
  }, [open, live, token, refresh]);

  // other parts of the page can open/close the chat with
  // window.dispatchEvent(new Event("toggle-chat"))
  useEffect(() => {
    const toggleChat = () => setOpen((o) => !o);
    window.addEventListener("toggle-chat", toggleChat);
    return () => window.removeEventListener("toggle-chat", toggleChat);
  }, []);

  // mark replies as seen while the panel is open
  useEffect(() => {
    if (open && thread) setSeen(ownerCount(thread));
  }, [open, thread]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [thread, open]);

  const hasUnread = !open && ownerCount(thread) > getSeen();

  const start = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await startChat(form);
      setChatToken(data.token);
      setToken(data.token);
      setThread(data.conversation);
      setForm({ name: "", email: "", body: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const reply = async (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setBusy(true);
    setError("");
    try {
      setThread(await sendChat(token, draft));
      setDraft("");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        className={`chat-fab ${open ? "is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close messages" : "Message me"}
        aria-expanded={open}
      >
        {open ? <FiX size={18} /> : <FiMessageCircle size={18} />}
        <span className="chat-fab-text">{open ? "Close" : "Message me"}</span>
        {hasUnread && <span className="chat-dot" aria-label="New reply" />}
      </button>

      {open && (
        <section className="chat-panel" aria-label="Messages">
          <header className="chat-head">
            <span className="chat-avatar">
              <img src={profile} alt="" />
            </span>
            <div>
              <p className="chat-title">Justine Cua</p>
              <p className="chat-sub">Web &amp; mobile developer</p>
            </div>
          </header>

          {!token ? (
            <form className="chat-start" onSubmit={start}>
              <p className="chat-intro">Send me a message. I’ll reply here.</p>
              <input
                placeholder="Your name"
                value={form.name}
                maxLength={100}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <textarea
                placeholder="Your message"
                rows={4}
                value={form.body}
                maxLength={4000}
                required
                onChange={(e) => setForm({ ...form, body: e.target.value })}
              />
              {error && <p className="chat-error">{error}</p>}
              <button className="btn-dark btn-block" disabled={busy}>
                {busy ? "Sending…" : "Send message"}
              </button>
              <p className="chat-note">Replies show up in this browser.</p>
            </form>
          ) : (
            <>
              <div className="chat-list" ref={listRef}>
                {!thread && <p className="chat-note">Loading…</p>}
                {thread?.messages.map((m) => (
                  <div key={m.id} className={`chat-msg chat-${m.sender}`}>
                    <p className="chat-bubble">{m.body}</p>
                    <span className="chat-time">
                      {formatTime(m.created_at)}
                    </span>
                  </div>
                ))}
                {thread && ownerCount(thread) === 0 && (
                  <p className="chat-note chat-wait">
                    Thanks! I’ll reply here.
                  </p>
                )}
              </div>

              <form className="chat-compose" onSubmit={reply}>
                {error && <p className="chat-error">{error}</p>}
                <textarea
                  placeholder="Write a message…"
                  rows={1}
                  value={draft}
                  maxLength={4000}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) reply(e);
                  }}
                />
                <button
                  className="chat-send"
                  disabled={busy || !draft.trim()}
                  aria-label="Send"
                >
                  <FiSend size={16} />
                </button>
              </form>
            </>
          )}
        </section>
      )}
    </>
  );
}

export default ChatWidget;
