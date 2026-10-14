import { useCallback, useEffect, useState } from "react";
import {
  Navigate,
  NavLink,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { FiExternalLink, FiLogOut } from "react-icons/fi";
import { getToken, logout, me, request } from "../../api/admin";
import { connectSocket } from "../../api/socket";
import { RESOURCES } from "./resources";
import ResourceManager from "./ResourceManager";
import MessagesManager from "./MessagesManager";
import ThemeToggle from "../ThemeToggle";

// only used while the live connection is down
const FALLBACK_POLL_MS = 30000;

const TABS = [
  ...Object.entries(RESOURCES).map(([key, r]) => ({ key, label: r.label })),
  { key: "messages", label: "Messages" },
];

function AdminPage() {
  const navigate = useNavigate();
  const { section = "projects" } = useParams();
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(Boolean(getToken()));
  const [unread, setUnread] = useState(0);
  const [live, setLive] = useState(false);
  const [inboxEvent, setInboxEvent] = useState(null);

  useEffect(() => {
    if (!getToken()) return;
    me()
      .then(setUser)
      .catch(() => navigate("/admin/login", { replace: true }))
      .finally(() => setChecking(false));
  }, [navigate]);

  const checkUnread = useCallback(
    () =>
      request("manage/conversations/unread/")
        .then((d) => setUnread(d.count))
        .catch(() => {}),
    [],
  );

  // live inbox: the badge (on every tab) and the Messages view update the
  // moment a visitor writes
  useEffect(() => {
    if (!user) return;
    checkUnread();
    return connectSocket(
      "ws/inbox/",
      getToken,
      (event) => {
        if (event.type === "ready") checkUnread();
        if (event.type === "inbox") {
          setUnread(event.unread);
          setInboxEvent({ ...event, at: Date.now() });
        }
      },
      (status) => setLive(status === "live"),
    );
  }, [user, checkUnread]);

  useEffect(() => {
    if (!user || live) return;
    const id = setInterval(checkUnread, FALLBACK_POLL_MS);
    return () => clearInterval(id);
  }, [user, live, checkUnread]);

  const handleUnread = useCallback((n) => setUnread(n), []);

  if (!getToken()) return <Navigate to="/admin/login" replace />;
  if (checking || !user) return <p className="adm-empty">Checking session…</p>;

  const isMessages = section === "messages";
  const resource = RESOURCES[section];
  if (!resource && !isMessages)
    return <Navigate to="/admin/projects" replace />;

  const signOut = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="adm">
      <header className="adm-head">
        <div className="adm-brand">
          <strong>Admin</strong>
          <span>Signed in as {user.username}</span>
        </div>

        <nav className="adm-tabs">
          {TABS.map((t) => (
            <NavLink
              key={t.key}
              to={`/admin/${t.key}`}
              className={() => `chip ${t.key === section ? "chip-active" : ""}`}
            >
              {t.label}
              {t.key === "messages" && unread > 0 && (
                <span className="adm-badge">{unread}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="adm-head-actions">
          <ThemeToggle />
          <Link to="/" className="btn-text btn-sm">
            View site <FiExternalLink size={13} />
          </Link>
          <button className="btn-outline btn-sm" onClick={signOut}>
            Log out <FiLogOut size={13} />
          </button>
        </div>
      </header>

      <main className="adm-main">
        {isMessages ? (
          <MessagesManager
            onUnreadChange={handleUnread}
            inboxEvent={inboxEvent}
            live={live}
          />
        ) : (
          <ResourceManager key={section} resource={resource} />
        )}
      </main>
    </div>
  );
}

export default AdminPage;
