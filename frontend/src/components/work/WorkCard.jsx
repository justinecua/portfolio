function WorkCard({ project, onClick }) {
  return (
    <div className="work-card" onClick={() => onClick(project)}>
      <div className="card-thumb">
        <img src={project.thumb} alt={project.title} />
        {/* <div className="card-thumb-overlay" /> */}
        <span className="card-play">▶</span>
      </div>

      <div className="card-body">
        <div className="card-meta">
          <span className="card-id">{project.id}</span>
          <span className="card-tag">{project.tag}</span>
        </div>

        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.desc}</p>

        <div className="card-stack">
          {project.stack.map((s) => (
            <span key={s} className="card-chip">
              {s}
            </span>
          ))}
        </div>

        <div className="card-footer">
          <span className="card-link">View project ↗</span>
        </div>
      </div>
    </div>
  );
}

export default WorkCard;
