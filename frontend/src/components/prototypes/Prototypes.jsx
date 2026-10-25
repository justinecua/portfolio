import { useState } from "react";
import { FiMessageCircle, FiSearch, FiX } from "react-icons/fi";
import PageTitle from "../layout/PageTitle";
import FilterChips from "../layout/FilterChips";
import PrototypeCard from "./PrototypeCard";
import { chipOptions } from "../../utils/chipOptions";
import { PROTOTYPES } from "../../prototypes";

const openChat = () => window.dispatchEvent(new Event("toggle-chat"));

// everything a visitor might type to find their business
const searchText = (p) =>
  [p.name, p.kind, p.location, p.blurb, ...p.designs.map((d) => d.name)]
    .join(" ")
    .toLowerCase();

const Prototypes = () => {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState(null);

  const q = query.trim().toLowerCase();
  const shown = PROTOTYPES.filter(
    (p) => (!kind || p.kind === kind) && (!q || searchText(p).includes(q)),
  );
  const kinds = chipOptions(PROTOTYPES, (p) => p.kind);

  const reset = () => {
    setQuery("");
    setKind(null);
  };

  return (
    <div className="tab-content">
      <div className="section-wrap">
        <PageTitle
          light="Prototypes"
          count={PROTOTYPES.length}
        >
          <label className="search">
            <FiSearch size={15} />
            <input
              type="search"
              placeholder="Search by business, type or place"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search prototypes"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <FiX size={14} />
              </button>
            )}
          </label>
          {kinds.length > 2 && (
            <FilterChips
              options={kinds}
              value={kind}
              onChange={setKind}
              label="Filter prototypes"
            />
          )}
        </PageTitle>

        {shown.length > 0 ? (
          <div className="proto-grid">
            {shown.map((p) => (
              <PrototypeCard key={p.slug} prototype={p} />
            ))}
          </div>
        ) : (
          <p className="blog-empty">
            No prototypes match “{query || kind}”.{" "}
            <button type="button" onClick={reset}>
              Clear search
            </button>
          </p>
        )}

      
      </div>
    </div>
  );
};

export default Prototypes;
