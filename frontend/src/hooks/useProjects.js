import { useEffect, useState } from "react";

const getYoutubeId = (url) => {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;
  const match = url.match(regExp);
  return match ? match[1] : url;
};

function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}projects/`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((p) => {
          const youtubeId = getYoutubeId(p.youtube);

          return {
            id: p.id,
            title: p.title,
            tag: p.tag,
            desc: p.description,
            youtubeId,
            // a custom thumbnail set in the admin wins over YouTube's
            thumb:
              p.thumbnail ||
              (youtubeId
                ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                : null),
            site: p.site,
            stack: p.stack?.map((s) => s.name) || [],
          };
        });

        setProjects(formatted);
      })
      .catch((err) => console.error("Error fetching projects:", err))
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading };
}

export default useProjects;
