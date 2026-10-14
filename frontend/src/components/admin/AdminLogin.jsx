import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../api/admin";
import ThemeToggle from "../ThemeToggle";

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(username, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(
        err.status === 429
          ? "Too many attempts. Wait a minute and try again."
          : err.message,
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="adm-login">
      <div className="adm-login-theme">
        <ThemeToggle />
      </div>
      <form className="adm-login-card" onSubmit={submit}>
        <h1>Admin</h1>
        <p className="adm-login-sub">Sign in to manage your site.</p>

        <div className="adm-field">
          <label htmlFor="adm-user">Username</label>
          <input
            id="adm-user"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="adm-field">
          <label htmlFor="adm-pass">Password</label>
          <input
            id="adm-pass"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="adm-error">{error}</p>}

        <button className="btn-dark btn-block" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <Link to="/" className="adm-back">
          ← Back to site
        </Link>
      </form>
    </div>
  );
}

export default AdminLogin;
