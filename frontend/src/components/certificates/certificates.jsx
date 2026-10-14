import { useEffect, useState } from "react";
import { FiAward } from "react-icons/fi";
import CertificateCard from "./CertificateCard";
import PageTitle from "../layout/PageTitle";
import FilterChips from "../layout/FilterChips";
import { chipOptions } from "../../utils/chipOptions";
import Spinner from "../Spinner";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);

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

  const options = chipOptions(certificates, (c) => c.category);
  const shown = category
    ? certificates.filter((c) => c.category === category)
    : certificates;

  return (
    <div className="tab-content">
      <div className="section-wrap">
        <PageTitle
          light="Certificates"
          count={certificates.length}
        >
          {options.length > 2 && (
            <FilterChips
              options={options}
              value={category}
              onChange={setCategory}
              label="Filter certificates"
            />
          )}
        </PageTitle>

        <div className="cert-grid">
          {shown.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
