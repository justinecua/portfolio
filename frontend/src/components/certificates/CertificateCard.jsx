import { FiArrowUpRight, FiAward, FiFileText, FiLink } from "react-icons/fi";

const CertificateCard = ({ certificate }) => {
  const href = certificate.file || certificate.url;
  const isFile = Boolean(certificate.file);
  const isImage = isFile && /\.(png|jpe?g|webp|gif)$/i.test(certificate.file);

  let preview;
  if (isImage) {
    preview = <img src={certificate.file} alt="" loading="lazy" />;
  } else if (isFile) {
    preview = (
      <iframe
        src={`${certificate.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
        title={certificate.title}
        loading="lazy"
        tabIndex="-1"
      />
    );
  } else {
    let host = "";
    try {
      host = new URL(certificate.url).hostname.replace(/^www\./, "");
    } catch {
      host = certificate.url;
    }
    preview = (
      <div className="ocard-linkprev">
        <FiAward size={26} />
        <span>{host}</span>
      </div>
    );
  }

  return (
    <a
      className="ocard"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${certificate.title} certificate`}
    >
      <div className="ocard-media ocard-media-doc">
        {preview}
        <span className="ocard-badge">
          {isFile ? <FiFileText size={12} /> : <FiLink size={12} />}
          {isFile ? "PDF" : "Link"}
        </span>
      </div>

      <div className="ocard-body">
        <p className="ocard-kicker">{certificate.issuer}</p>
        <h3 className="ocard-title">{certificate.title}</h3>
      </div>

      <div className="ocard-foot">
        <span className="ocard-muted">{certificate.date_label}</span>
        <span className="ocard-link">
          View <FiArrowUpRight size={14} />
        </span>
      </div>
    </a>
  );
};

export default CertificateCard;
