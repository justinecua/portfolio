const API_BASE = import.meta.env.VITE_API_BASE_URL;
const TOKEN_KEY = "admin_token";

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

const setToken = (token) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // storage unavailable - the session just won't persist
  }
};

// Turns a DRF error body into one readable line.
const errorMessage = (data, fallback) => {
  if (!data) return fallback;
  if (typeof data === "string") return data;
  if (data.detail) return data.detail;
  if (data.non_field_errors) return data.non_field_errors.join(" ");
  return Object.entries(data)
    .map(([field, msgs]) => `${field}: ${[].concat(msgs).join(" ")}`)
    .join(" · ");
};

export async function request(path, { method = "GET", body } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Token ${token}`;

  const isForm = body instanceof FormData;
  if (body && !isForm) headers["Content-Type"] = "application/json";

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  });

  if (res.status === 401) setToken(null);
  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(errorMessage(data, `Request failed (${res.status})`));
    err.status = res.status;
    throw err;
  }
  return data;
}

export async function login(username, password) {
  const data = await request("auth/login/", {
    method: "POST",
    body: { username, password },
  });
  setToken(data.token);
  return data;
}

export async function logout() {
  try {
    await request("auth/logout/", { method: "POST" });
  } finally {
    setToken(null);
  }
}

export const me = () => request("auth/me/");
