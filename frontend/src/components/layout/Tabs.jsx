import { NavLink } from "react-router-dom";

function Tabs({ tabs }) {
  const getPath = (tab) => {
    if (tab === "About") return "/";
    return `/${tab.toLowerCase()}`;
  };

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <NavLink
          key={tab}
          to={getPath(tab)}
          end={tab === "About"}
          className={({ isActive }) => (isActive ? "tab tab-active" : "tab")}
        >
          {({ isActive }) => (
            <>
              {tab}
              {isActive && <span className="tab-indicator" />}
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}

export default Tabs;
