const CertificateCard = ({ certificate }) => {
  const isExternalLink =
    certificate.file.startsWith("http://") ||
    certificate.file.startsWith("https://");

  const isPdf = certificate.file.toLowerCase().includes(".pdf");
  const pdfPreview = `${certificate.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
  const websitePreview = `https://image.thum.io/get/width/1980/crop/550/${certificate.file}`;

  return (
    <a
      className="certificate-card"
      href={certificate.file}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${certificate.title} certificate`}
    >
      <div className="pdf-preview">
        <span className="pdf-badge">
          {isExternalLink && !isPdf ? "LINK" : "PDF"}
        </span>

        {isExternalLink && !isPdf ? (
          <img
            src={websitePreview}
            alt={`${certificate.title} preview`}
            className="certificate-link-preview"
            loading="lazy"
          />
        ) : (
          <iframe
            src={pdfPreview}
            title={certificate.title}
            loading="lazy"
            tabIndex="-1"
          />
        )}

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
          <span className="card-link">View Certificate ↗</span>
        </div>
      </div>
    </a>
  );
};

export default CertificateCard;
