import Tabs from "./Tabs";
import ThemeToggle from "../ThemeToggle";
import logo from "../../assets/logo_portfolio.jpeg";

function Header({ tabs, minimized }) {
  return (
    <header className={`header ${minimized ? "header-min" : ""}`}>
      <div className="header-left">
        <img src={logo} alt="Justine Cua Logo" className="logo-img" />
        <span className="tagline">Justine Cua</span>
      </div>

      <div className="header-center">
        <Tabs tabs={tabs} />
      </div>

      <ThemeToggle />
    </header>
  );
}

export default Header;
