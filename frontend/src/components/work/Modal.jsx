function Modal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-video">
          <iframe
            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0`}
            title={project.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>

        <div className="modal-info">
          <div className="modal-top">
            <div>
              <span className="modal-tag">{project.tag}</span>
              <h2 className="modal-title">{project.title}</h2>
            </div>

            <a
              href={project.site}
              target="_blank"
              rel="noreferrer"
              className="modal-site-btn"
            >
              Visit Site ↗
            </a>
          </div>

          <p className="modal-desc">{project.desc}</p>

          <div className="modal-stack">
            {project.stack.map((s) => (
              <span key={s} className="modal-chip">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
