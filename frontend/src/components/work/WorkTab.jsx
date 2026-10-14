import { useState } from "react";
import useProjects from "../../hooks/useProjects";
import PageTitle from "../layout/PageTitle";
import WorkCard from "./WorkCard";
import Modal from "./Modal";
import Spinner from "../Spinner";
import GithubActivity from "./Githubactivity";

function WorkTab() {
  const [selected, setSelected] = useState(null);
  const { projects, loading } = useProjects();

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
          <PageTitle light="Projects" />
          <div className="card-grid">
            {projects.map((p) => (
              <WorkCard key={p.id} project={p} onClick={setSelected} />
            ))}
          </div>

          <div className="work-gh">
            <GithubActivity />
          </div>
        </div>
      </div>

      <Modal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}

export default WorkTab;
