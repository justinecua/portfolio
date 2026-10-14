function PageTitle({ light, bold, sub }) {
  return (
    <div className="page-head">
      <h1 className="page-title">
        {light}
        {bold && <em> {bold}</em>}
      </h1>
      {sub && <p className="page-sub">{sub}</p>}
    </div>
  );
}

export default PageTitle;
