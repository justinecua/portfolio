import ReactCertificate from "../../assets/certificates/PSIT_Laravel_Cert.pdf";
import GDG from "../../assets/certificates/GDG.pdf";
import CertificateCard from "./CertificateCard";

const Certificates = () => {
  const certificates = [
    {
      title: "3 day Laravel Framework Training",
      issuer: "Philippine Society of Information Technology Educators",
      category: "Backend Development",
      file: ReactCertificate,
      date: "June 24-26, 2026",
    },
    {
      title:
        "Multimodal AI with Firebase using Gemini with Extensions and GenKit",
      issuer: "GDG Cagayan de Oro",
      category: "Backend Development",
      file: GDG,
      date: "Nov 16, 2024",
    },
  ];

  return (
    <div className="tab-content">
      <div className="section-wrap">
        <div className="certificate-grid">
          {certificates.map((cert) => (
            <CertificateCard key={cert.title} certificate={cert} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
