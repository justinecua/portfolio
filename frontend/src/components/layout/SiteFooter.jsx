import Clock from "./Clock";
import { SOCIALS } from "../../data/data";

function SiteFooter() {
  return (
    <footer className="frame site-footer">
      <p className="footer-copy">
        © {new Date().getFullYear()} Justine Cua · Iligan City, PH
      </p>
      <div className="footer-socials">
        {SOCIALS.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
      </div>
      <Clock />
    </footer>
  );
}

export default SiteFooter;
