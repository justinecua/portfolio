// Page header used by the projects, blog and certificates pages:
// title + item count, optional subtitle, and an optional controls row
// (filters / search) passed as children.
function PageTitle({ light, bold, sub, count, children }) {
  return (
    <header className="page-head">
      <div className="page-head-top">
        <h1 className="page-title">
          {light}
          {bold && <em> {bold}</em>}
          {count != null && <span className="page-count">{count}</span>}
        </h1>
        {sub && <p className="page-sub">{sub}</p>}
      </div>
      {children && <div className="page-controls">{children}</div>}
    </header>
  );
}

export default PageTitle;
