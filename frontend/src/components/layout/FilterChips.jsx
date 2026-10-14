// A row of single-select filter chips with counts. `options` is a list of
// { value, label, count }; the first chip ("All") uses value null.
function FilterChips({ options, value, onChange, label = "Filter" }) {
  return (
    <div className="filter-chips" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.label}
          type="button"
          className={`chip ${o.value === value ? "chip-active" : ""}`}
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
          <span className="chip-count">{o.count}</span>
        </button>
      ))}
    </div>
  );
}

export default FilterChips;
