import { FiArrowUpRight, FiMapPin } from "react-icons/fi";

// Prototypes are plain <a> links, not router <Link>s: a full page load
// keeps each prototype's own styles (Tailwind) out of the portfolio.
function PrototypeCard({ prototype: p }) {
  const href = `/prototype/${p.slug}`;
  return (
    <article className="proto">
      <a href={href} className="proto-cover" aria-label={`Open ${p.name} prototype`}>
        <img src={p.cover} alt="" loading="lazy" />
        <span className="proto-count">{p.designs.length} designs</span>
      </a>

      <div className="proto-body">
        <h3 className="proto-name">
          <a href={href}>{p.name}</a>
        </h3>
        <p className="proto-blurb">{p.blurb}</p>

        <div className="proto-designs" aria-label="Designs">
          {p.designs.map((d) => (
            <a key={d.id} href={`${href}?design=${d.id}`}>
              {d.name}
            </a>
          ))}
        </div>

        <a href={href} className="proto-open">
          Browse prototype <FiArrowUpRight size={15} />
        </a>
      </div>
    </article>
  );
}

export default PrototypeCard;
