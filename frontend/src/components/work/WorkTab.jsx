import { useEffect, useState } from "react";
import WorkCard from "./WorkCard";
import Modal from "./Modal";
import Spinner from "../Spinner";

function WorkTab() {
  const [selected, setSelected] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}projects/`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((p) => {
          const getYoutubeId = (url) => {
            if (!url) return null;
            const regExp =
              /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;
            const match = url.match(regExp);
            return match ? match[1] : url;
          };

          const youtubeId = getYoutubeId(p.youtube);

          return {
            id: p.id,
            title: p.title,
            tag: p.tag,
            desc: p.description,
            youtubeId,
            thumb: youtubeId
              ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
              : null,
            site: p.site,
            stack: p.stack?.map((s) => s.name) || [],
          };
        });

        setProjects(formatted);
      })
      .catch((err) => console.error("Error fetching projects:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  if (!projects.length)
    return (
      <div className="tab-content center">
        <div className="empty-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
        <p className="muted">No projects yet.</p>
        <p className="muted-sub">Working on something — will be here soon.</p>
      </div>
    );

  return (
    <>
      <div className="tab-content">
        <div className="section-wrap">
          <div className="work-grid">
            {projects.map((p) => (
              <WorkCard key={p.id} project={p} onClick={setSelected} />
            ))}
          </div>
        </div>
      </div>

      <Modal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}

export default WorkTab;
