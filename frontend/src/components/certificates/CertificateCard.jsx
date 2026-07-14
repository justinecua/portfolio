function CertificateCard({ certificate }) {
  return (
    <div className="certificate-card">
      <div className="pdf-preview">
        <span className="pdf-badge">PDF</span>

        <iframe
          src={`${certificate.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
          title={certificate.title}
        />

        <div className="preview-overlay" />
      </div>

      <div className="card-body">
        <div className="card-meta">
          <span className="card-tag">{certificate.date}</span>
        </div>
        <div className="card-title">
          <h3>{certificate.title}</h3>
        </div>

        <p className="card-desc">Issuer: {certificate.issuer}</p>

        <div className="card-footer">
          <a
            className="card-link"
            href={certificate.file}
            target="_blank"
            rel="noreferrer"
          >
            View Certificate ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default CertificateCard;
