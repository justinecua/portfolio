import { useCallback, useEffect, useRef, useState } from "react";
import { FiMail, FiSend, FiTrash2, FiX } from "react-icons/fi";
import { request } from "../../api/admin";

const PATH = "manage/conversations/";
// only used while the live connection is down
const FALLBACK_POLL_MS = 20000;

const formatTime = (iso) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const withMessage = (thread, message) =>
  thread.messages.some((m) => m.id === message.id)
    ? thread
    : { ...thread, messages: [...thread.messages, message] };

function MessagesManager({ onUnreadChange, inboxEvent, live }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(null); // full conversation
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const threadRef = useRef(null);

  const load = useCallback(async () => {
    try {
      const data = await request(PATH);
      setItems(data);
      onUnreadChange?.(data.filter((c) => c.unread_by_owner).length);
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [onUnreadChange]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (live) return;
    const id = setInterval(load, FALLBACK_POLL_MS);
    return () => clearInterval(id);
  }, [live, load]);

  // react to live events from the inbox socket
  useEffect(() => {
    if (!inboxEvent) return;
    load();
    setOpen((current) => {
      if (!current || inboxEvent.conversation_id !== current.id) return current;
      if (inboxEvent.event === "deleted") return null;
      if (inboxEvent.event === "message")
        return withMessage(current, inboxEvent.message);
      return current;
    });
  }, [inboxEvent, load]);

  // a visitor's new message arrives while their thread is open: mark it read
  useEffect(() => {
    if (
      open &&
      inboxEvent?.event === "message" &&
      inboxEvent.conversation_id === open.id &&
      inboxEvent.message.sender === "visitor"
    ) {
      request(`${PATH}${open.id}/`).catch(() => {});
    }
    // only when a new event arrives
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inboxEvent]);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [open?.messages.length, open?.id]);

  const openThread = async (c) => {
    setDraft("");
    setError("");
    try {
      setOpen(await request(`${PATH}${c.id}/`));
      load(); // refresh unread state
    } catch (e) {
      setError(e.message);
    }
  };

  const reply = async (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setSending(true);
    setError("");
    try {
      setOpen(
        await request(`${PATH}${open.id}/reply/`, {
          method: "POST",
          body: { body: draft },
        }),
      );
      setDraft("");
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  const remove = async (c) => {
    if (!window.confirm(`Delete the conversation with ${c.name}?`)) return;
    try {
      await request(`${PATH}${c.id}/`, { method: "DELETE" });
      if (open?.id === c.id) setOpen(null);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="adm-resource">
      <div className="adm-toolbar">
        <h2>
          Messages
          <span>{items.length}</span>
        </h2>
        <span className={`adm-live ${live ? "is-live" : ""}`}>
          <span className="adm-live-dot" />
          {live ? "Live" : "Reconnecting…"}
        </span>
      </div>

      {error && !open && <p className="adm-error">{error}</p>}

      {loading ? (
        <p className="adm-empty">Loading…</p>
      ) : items.length === 0 ? (
        <p className="adm-empty">No messages yet.</p>
      ) : (
        <ul className="adm-list">
          {items.map((c) => (
            <li
              key={c.id}
              className={`adm-row adm-row-click ${c.unread_by_owner ? "is-unread" : ""}`}
              onClick={() => openThread(c)}
            >
              <span className="adm-unread-dot" aria-hidden="true" />
              <div className="adm-row-text">
                <p className="adm-row-title">
                  {c.name}
                  {c.email && <span className="adm-row-email">{c.email}</span>}
                </p>
                <p className="adm-row-meta">{c.preview}</p>
              </div>
              <span className="adm-row-time">{formatTime(c.updated_at)}</span>
              <div className="adm-row-actions">
                <button
                  className="adm-icon adm-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(c);
                  }}
                  aria-label={`Delete conversation with ${c.name}`}
                >
                  <FiTrash2 size={15} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <div className="adm-modal-backdrop" onClick={() => setOpen(null)}>
          <div
            className="adm-modal adm-modal-wide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="adm-modal-head">
              <div>
                <h3>{open.name}</h3>
                {open.email && (
                  <a href={`mailto:${open.email}`} className="adm-current">
                    <FiMail size={12} /> {open.email}
                  </a>
                )}
              </div>
              <button
                type="button"
                className="adm-icon"
                onClick={() => setOpen(null)}
                aria-label="Close"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="adm-thread" ref={threadRef}>
              {open.messages.map((m) => (
                <div
                  key={m.id}
                  className={`chat-msg chat-${m.sender === "owner" ? "visitor" : "owner"}`}
                >
                  <p className="chat-bubble">{m.body}</p>
                  <span className="chat-time">
                    {m.sender === "owner" ? "You · " : ""}
                    {formatTime(m.created_at)}
                  </span>
                </div>
              ))}
            </div>

            <form className="adm-modal-foot adm-reply" onSubmit={reply}>
              {error && <p className="adm-error">{error}</p>}
              <textarea
                placeholder={`Reply to ${open.name}…`}
                rows={2}
                value={draft}
                maxLength={4000}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) reply(e);
                }}
              />
              <button
                className="btn-dark btn-sm"
                disabled={sending || !draft.trim()}
              >
                {sending ? "Sending…" : "Reply"} <FiSend size={13} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessagesManager;
