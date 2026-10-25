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
            // thumbnails to try in order: an uploaded photo, a thumbnail URL,
            // then YouTube's sizes from sharpest down (maxres is 1280x720
            // but doesn't exist for every video)
            thumbs: [
              p.thumbnail_file,
              p.thumbnail,
              ...(youtubeId
                ? ["maxresdefault", "sddefault", "hqdefault"].map(
                    (q) => `https://img.youtube.com/vi/${youtubeId}/${q}.jpg`,
                  )
                : []),
            ].filter(Boolean),
            logo: p.logo_file || null,
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
