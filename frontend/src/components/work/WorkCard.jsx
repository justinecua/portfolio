import { FiArrowUpRight, FiPlay } from "react-icons/fi";

function WorkCard({ project, onClick }) {
  const hasDemo = Boolean(project.youtubeId);
  const open = () => {
    if (hasDemo) onClick(project);
    else if (project.site) window.open(project.site, "_blank", "noopener");
  };

  return (
    <article
      className="ocard"
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => e.key === "Enter" && open()}
    >
      <div className="ocard-media ocard-media-video">
        {project.thumb ? (
          <img src={project.thumb} alt="" loading="lazy" />
        ) : (
          <span className="ocard-placeholder">{project.title.charAt(0)}</span>
        )}
        {hasDemo && (
          <span className="ocard-play" aria-hidden="true">
            <FiPlay size={16} />
          </span>
        )}
      </div>

      <div className="ocard-body">
        <p className="ocard-kicker">{project.tag}</p>
        <h3 className="ocard-title">{project.title}</h3>
        <p className="ocard-desc">{project.desc}</p>

        {project.stack.length > 0 && (
          <div className="ocard-chips">
            {project.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        )}
      </div>

      <div className="ocard-foot">
        <span className="ocard-muted">{hasDemo ? "Watch demo" : ""}</span>
        {project.site && (
          <a
            href={project.site}
            target="_blank"
            rel="noreferrer"
            className="ocard-link"
            onClick={(e) => e.stopPropagation()}
          >
            Visit site <FiArrowUpRight size={14} />
          </a>
        )}
      </div>
    </article>
  );
}

export default WorkCard;
