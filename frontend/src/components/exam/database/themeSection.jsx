const THEMES = [
  "Student Record System",
  "Book Library System",
  "Product Inventory System",
  "Employee Directory System",
];

const ThemeSection = () => (
  <div className="instr-block">
    <p className="instr-label">Choose One System </p>
    <div className="instr-themes">
      {THEMES.map((theme, i) => (
        <div key={theme} className="instr-theme-item">
          <span className="instr-theme-num">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="instr-theme-name">{theme}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ThemeSection;
