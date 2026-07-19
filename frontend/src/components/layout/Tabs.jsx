import { NavLink } from "react-router-dom";
import { FiUser, FiEdit3, FiFolder, FiAward } from "react-icons/fi";

const TAB_ICONS = {
  About: FiUser,
  Blog: FiEdit3,
  Projects: FiFolder,
  Certificates: FiAward,
};

function Tabs({ tabs }) {
  const getPath = (tab) => {
    if (tab === "About") return "/";
    return `/${tab.toLowerCase()}`;
  };

  return (
    <div className="tabs">
      {tabs.map((tab) => {
        const Icon = TAB_ICONS[tab];
        return (
          <NavLink
            key={tab}
            to={getPath(tab)}
            end={tab === "About"}
            className={({ isActive }) => (isActive ? "tab tab-active" : "tab")}
          >
            {({ isActive }) => (
              <>
                {Icon && <Icon className="tab-icon" size={15} />}
                <span className="tab-label">{tab}</span>
                {isActive && <span className="tab-indicator" />}
              </>
            )}
          </NavLink>
        );
      })}
    </div>
  );
}

export default Tabs;
