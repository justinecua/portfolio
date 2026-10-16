import { useState } from "react";
import { FiArrowUpRight, FiPlay } from "react-icons/fi";
import useProjects from "../../hooks/useProjects";
import PageTitle from "../layout/PageTitle";
import FilterChips from "../layout/FilterChips";
import { chipOptions } from "../../utils/chipOptions";
import WorkCard from "./WorkCard";
import ProjectThumb from "./ProjectThumb";
import Modal from "./Modal";
import Spinner from "../Spinner";
import GithubActivity from "./Githubactivity";

// The newest (first) project, shown large above the grid.
function FeaturedProject({ project, onPlay }) {
  const hasDemo = Boolean(project.youtubeId);

  return (
    <article className="feat">
      <button
        type="button"
        className="feat-media"
        onClick={() => hasDemo && onPlay(project)}
        disabled={!hasDemo}
        aria-label={hasDemo ? `Watch ${project.title} demo` : project.title}
      >
        {project.thumbs.length ? (
          <ProjectThumb
            sources={project.thumbs}
            fallback={
              <span className="ocard-placeholder">
                {project.title.charAt(0)}
              </span>
            }
          />
        ) : (
          <span className="ocard-placeholder">{project.title.charAt(0)}</span>
        )}
        {hasDemo && (
          <span className="feat-play" aria-hidden="true">
            <FiPlay size={20} />
          </span>
        )}
      </button>

      <div className="feat-body">
        <h2 className="feat-title">{project.title}</h2>
        <p className="feat-desc">{project.desc}</p>

        {project.stack.length > 0 && (
          <div className="ocard-chips">
            {project.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        )}

        <div className="feat-actions">
          {hasDemo && (
            <button className="btn-dark btn-sm" onClick={() => onPlay(project)}>
              <FiPlay size={14} /> Watch demo
            </button>
          )}
          {project.site && (
            <a
              href={project.site}
              target="_blank"
              rel="noreferrer"
              className="btn-outline btn-sm"
            >
              Visit site <FiArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function WorkTab() {
  const [selected, setSelected] = useState(null);
  const [tag, setTag] = useState(null);
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

  const options = chipOptions(projects, (p) => p.tag);
  const shown = tag ? projects.filter((p) => p.tag === tag) : projects;
  const [featured, ...rest] = shown;

  return (
    <>
      <div className="tab-content">
        <div className="section-wrap">
          <PageTitle light="Projects" count={projects.length}>
            {options.length > 2 && (
              <FilterChips
                options={options}
                value={tag}
                onChange={setTag}
                label="Filter projects"
              />
            )}
          </PageTitle>

          {featured && (
            <FeaturedProject project={featured} onPlay={setSelected} />
          )}

          {rest.length > 0 && (
            <div className="card-grid card-grid-2">
              {rest.map((p) => (
                <WorkCard key={p.id} project={p} onClick={setSelected} />
              ))}
            </div>
          )}

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
