import { FiArrowUp, FiArrowDown, FiTrash2, FiPlus } from "react-icons/fi";

const TYPES = [
  { value: "p", label: "Paragraph" },
  { value: "h2", label: "Heading" },
  { value: "code", label: "Code" },
];

function BlockEditor({ blocks = [], onChange }) {
  const update = (i, patch) =>
    onChange(blocks.map((b, j) => (j === i ? { ...b, ...patch } : b)));

  const move = (i, dir) => {
    const next = [...blocks];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  const remove = (i) => onChange(blocks.filter((_, j) => j !== i));

  const add = (type) => onChange([...blocks, { type, text: "" }]);

  return (
    <div className="adm-blocks">
      {blocks.map((b, i) => (
        <div key={i} className="adm-block">
          <div className="adm-block-head">
            <select
              value={b.type}
              onChange={(e) => update(i, { type: e.target.value })}
              aria-label="Block type"
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <div className="adm-block-actions">
              <button
                type="button"
                className="adm-icon"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                aria-label="Move up"
              >
                <FiArrowUp size={14} />
              </button>
              <button
                type="button"
                className="adm-icon"
                onClick={() => move(i, 1)}
                disabled={i === blocks.length - 1}
                aria-label="Move down"
              >
                <FiArrowDown size={14} />
              </button>
              <button
                type="button"
                className="adm-icon adm-danger"
                onClick={() => remove(i)}
                aria-label="Remove block"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          </div>
          <textarea
            rows={b.type === "h2" ? 1 : b.type === "code" ? 6 : 4}
            value={b.text}
            required
            className={b.type === "code" ? "adm-code" : ""}
            onChange={(e) => update(i, { text: e.target.value })}
          />
        </div>
      ))}

      <div className="adm-block-add">
        {TYPES.map((t) => (
          <button
            key={t.value}
            type="button"
            className="chip"
            onClick={() => add(t.value)}
          >
            <FiPlus size={12} /> {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BlockEditor;
