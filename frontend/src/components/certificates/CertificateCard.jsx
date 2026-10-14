import {
  FiArrowUpRight,
  FiAward,
  FiCalendar,
  FiFileText,
  FiLink,
} from "react-icons/fi";

const hostOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const CertificateCard = ({ certificate }) => {
  const href = certificate.file || certificate.url;
  const isFile = Boolean(certificate.file);
  const isImage = isFile && /\.(png|jpe?g|webp|gif)$/i.test(certificate.file);

  // PDFs and links get a clean placeholder: browsers render embedded PDFs
  // as a dark viewer at this size. Image certificates show the real image.
  const preview = isImage ? (
    <img src={certificate.file} alt="" loading="lazy" />
  ) : (
    <div className="cert-linkprev">
      {isFile ? <FiFileText size={22} /> : <FiAward size={22} />}
      <span>{isFile ? "PDF certificate" : hostOf(certificate.url)}</span>
    </div>
  );

  return (
    <a
      className="cert"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${certificate.title} certificate`}
    >
      <div className="cert-paper">{preview}</div>

      <div className="cert-body">
        <p className="cert-issuer">{certificate.issuer}</p>
        <h3 className="cert-title">{certificate.title}</h3>

        <div className="cert-meta">
          {certificate.date_label && (
            <span>
              <FiCalendar size={12} /> {certificate.date_label}
            </span>
          )}
          <span>
            {isFile ? <FiFileText size={12} /> : <FiLink size={12} />}
            {isFile ? "PDF" : "Link"}
          </span>
          {certificate.category && (
            <span className="cert-cat">{certificate.category}</span>
          )}
        </div>
      </div>

      <span className="cert-go" aria-hidden="true">
        <FiArrowUpRight size={16} />
      </span>
    </a>
  );
};

export default CertificateCard;
