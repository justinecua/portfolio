import { useEffect, useState } from "react";
import { FiAward } from "react-icons/fi";
import CertificateCard from "./CertificateCard";
import PageTitle from "../layout/PageTitle";
import Spinner from "../Spinner";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}certificates/`)
      .then((res) => res.json())
      .then(setCertificates)
      .catch((err) => console.error("Error fetching certificates:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  if (!certificates.length)
    return (
      <div className="tab-content center">
        <div className="empty-icon">
          <FiAward size={22} />
        </div>
        <p className="muted">No certificates yet.</p>
      </div>
    );

  return (
    <div className="tab-content">
      <div className="section-wrap">
        <PageTitle light="Certificates" />
        <div className="card-grid">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
