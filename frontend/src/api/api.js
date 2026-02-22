const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getProjects = async () => {
  const res = await fetch(`${API_BASE}projects/`);
  return res.json();
};

export const getPosts = async () => {
  const res = await fetch(`${API_BASE}posts/`);
  return res.json();
};
