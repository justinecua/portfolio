import Clock from "./Clock";
import { SOCIALS } from "../../data/data";

function SiteFooter() {
  return (
    <footer className="frame site-footer">
      <p className="footer-copy">
        © {new Date().getFullYear()} Justine Cua · Iligan City, PH
      </p>
     
      <Clock />
    </footer>
  );
}

export default SiteFooter;
