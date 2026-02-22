import Tabs from "./Tabs";
import ThemeToggle from "../ThemeToggle";
import logo from "../../assets/logo_portfolio.jpeg";
import { Link } from "react-router-dom";

function Header({ tabs, minimized }) {
  return (
    <header className={`header ${minimized ? "header-min" : ""}`}>
      <Link to="/" className="header-left" aria-label="Go to About">
        <img src={logo} alt="Justine Cua Logo" className="logo-img" />
        <span className="tagline">Justine Cua</span>
      </Link>

      <div className="header-center">
        <Tabs tabs={tabs} />
      </div>

      <ThemeToggle />
    </header>
  );
}

export default Header;
