import ReactCertificate from "../../assets/certificates/PSIT_Laravel_Cert.pdf";
import GDG from "../../assets/certificates/GDG.pdf";
import CertificateCard from "./CertificateCard";

const Certificates = () => {
  const certificates = [
    {
      title: "Linux TestDome Certificate",
      issuer: "TestDome",
      category: "TestDome",
      file: "https://www.testdome.com/certificates/0b3f53d3e6ed45c7a8c30230f3d9de0a",
      date: "July 18, 2026",
    },
    {
      title: "SQL TestDome Certificate",
      issuer: "TestDome",
      category: "TestDome",
      file: "https://www.testdome.com/certificates/18144616f8274aa0b7b4ddbe4f225d31",
      date: "July 18, 2026",
    },
    {
      title: "3 Day Laravel Framework Training",
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
