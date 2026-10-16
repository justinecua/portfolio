import { Link, NavLink } from "react-router-dom";
import {
  FiHome,
  FiFolder,
  FiEdit3,
  FiAward,
  FiMail,
  FiLayout,
} from "react-icons/fi";
import { FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import ThemeToggle from "../ThemeToggle";
import profile from "../../assets/profile.jpeg";

const NAV = {
  About: { path: "/", label: "Home", Icon: FiHome },
  Projects: { path: "/projects", label: "Projects", Icon: FiFolder },
  Blog: { path: "/blog", label: "Blog", Icon: FiEdit3 },
  Prototypes: { path: "/prototypes", label: "Prototypes", Icon: FiLayout },
  Certificates: { path: "/certificates", label: "Certificates", Icon: FiAward },
};

const SOCIAL_ICONS = [
  { href: "https://x.com/jazzzztin", label: "X", Icon: FaXTwitter },
  {
    href: "https://www.linkedin.com/in/justine-cua-886701303/",
    label: "LinkedIn",
    Icon: FaLinkedinIn,
  },
  { href: "https://github.com/justinecua", label: "GitHub", Icon: FaGithub },
];

function SiteHeader({ tabs }) {
  return (
    <header className="site-header">
      <div className="nav-pill">
        <Link to="/" className="nav-logo" aria-label="Home">
          <img src={profile} alt="" />
        </Link>

        <nav className="nav-group" aria-label="Main">
          {tabs.map((tab) => {
            const { path, label, Icon } = NAV[tab];
            return (
              <NavLink
                key={tab}
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
                aria-label={label}
              >
                <Icon size={16} />
                <span className="nav-tip">{label}</span>
              </NavLink>
            );
          })}
        </nav>

        <span className="nav-sep" />

        <div className="nav-group nav-socials">
          {SOCIAL_ICONS.map((s) => {
            const Icon = s.Icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="nav-item"
                aria-label={s.label}
              >
                <Icon size={15} />
                <span className="nav-tip">{s.label}</span>
              </a>
            );
          })}
        </div>

        <ThemeToggle />

        <a
          href="mailto:jcua.dev@gmail.com"
          className="nav-item nav-mail"
          aria-label="Email me"
        >
          <FiMail size={15} />
          <span className="nav-tip">Email me</span>
        </a>
      </div>
    </header>
  );
}

export default SiteHeader;
