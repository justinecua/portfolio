import { useCallback, useEffect, useMemo, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { request } from "../../api/admin";
import BlockEditor from "./BlockEditor";

// Thumbnail of a newly picked image file, or of the current one.
function FilePreview({ file, url }) {
  const objectUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  );
  // free the temporary URL when the file changes or the form closes
  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  const src = file ? objectUrl : url;
  if (!src) return null;
  return (
    <div className="adm-preview">
      <img src={src} alt="" />
      <span>{file ? "New photo" : "Current photo"}</span>
    </div>
  );
}

function Field({ field, value, onChange, form }) {
  const id = `f-${field.name}`;
  const common = {
    id,
    name: field.name,
    required: field.required,
    placeholder: field.placeholder,
  };

  let input;
  if (field.type === "textarea") {
    input = (
      <textarea
        {...common}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  } else if (field.type === "blocks") {
    input = <BlockEditor blocks={value} onChange={onChange} />;
  } else if (field.type === "checkbox") {
    input = (
      <label className="adm-check">
        <input
          id={id}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>{field.label}</span>
      </label>
    );
  } else if (field.type === "file") {
    const current = field.current?.(form);
    input = (
      <>
        {field.preview && (value || current) && (
          <FilePreview file={value} url={current} />
        )}
        {current && !value && !field.preview && (
          <a
            href={current}
            target="_blank"
            rel="noreferrer"
            className="adm-current"
          >
            Current file ↗
          </a>
        )}
        <input
          id={id}
          type="file"
          accept={field.accept}
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
      </>
    );
  } else {
    input = (
      <input
        {...common}
        type={field.type || "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <div className="adm-field">
      {field.type !== "checkbox" && (
        <label htmlFor={id}>
          {field.label}
          {field.required && <span className="adm-req"> *</span>}
        </label>
      )}
      {input}
      {field.hint && <p className="adm-hint">{field.hint}</p>}
    </div>
  );
}

function ResourceManager({ resource }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // null | "new" | item
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setItems(await request(resource.path));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [resource]);

  useEffect(() => {
    setEditing(null);
    load();
  }, [load]);

  const openForm = (item) => {
    setEditing(item || "new");
    setForm(resource.toForm(item || {}));
    setError("");
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const body = resource.toPayload(form);
      if (editing === "new") {
        await request(resource.path, { method: "POST", body });
      } else {
        await request(`${resource.path}${editing.id}/`, {
          // file uploads go as a partial update; plain JSON as a full one
          method:
            resource.multipart || body instanceof FormData ? "PATCH" : "PUT",
          body,
        });
      }
      setEditing(null);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item) => {
    const name = resource.row(item).title;
    if (!window.confirm(`Delete “${name}”? This can’t be undone.`)) return;
    try {
      await request(`${resource.path}${item.id}/`, { method: "DELETE" });
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="adm-resource">
      <div className="adm-toolbar">
        <h2>
          {resource.label}
          <span>{items.length}</span>
        </h2>
        <button className="btn-dark btn-sm" onClick={() => openForm(null)}>
          <FiPlus size={14} /> New {resource.singular}
        </button>
      </div>

      {error && !editing && <p className="adm-error">{error}</p>}

      {loading ? (
        <p className="adm-empty">Loading…</p>
      ) : items.length === 0 ? (
        <p className="adm-empty">No {resource.label.toLowerCase()} yet.</p>
      ) : (
        <ul className="adm-list">
          {items.map((item) => {
            const row = resource.row(item);
            return (
              <li key={item.id} className="adm-row">
                <div className="adm-row-text">
                  <p className="adm-row-title">{row.title}</p>
                  <p className="adm-row-meta">{row.meta}</p>
                </div>
                <div className="adm-row-actions">
                  <button
                    className="adm-icon"
                    onClick={() => openForm(item)}
                    aria-label={`Edit ${row.title}`}
                  >
                    <FiEdit2 size={15} />
                  </button>
                  <button
                    className="adm-icon adm-danger"
                    onClick={() => remove(item)}
                    aria-label={`Delete ${row.title}`}
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {editing && (
        <div className="adm-modal-backdrop" onClick={() => setEditing(null)}>
          <form
            className="adm-modal"
            onSubmit={save}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="adm-modal-head">
              <h3>
                {editing === "new"
                  ? `New ${resource.singular}`
                  : `Edit ${resource.singular}`}
              </h3>
              <button
                type="button"
                className="adm-icon"
                onClick={() => setEditing(null)}
                aria-label="Close"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="adm-modal-body">
              {resource.fields
                .filter((field) => !field.showIf || field.showIf(form))
                .map((field) => (
                  <Field
                    key={field.name}
                    field={field}
                    form={form}
                    value={form[field.name] ?? ""}
                    onChange={(v) =>
                      setForm((f) => ({ ...f, [field.name]: v }))
                    }
                  />
                ))}
            </div>

            <div className="adm-modal-foot">
              {error && <p className="adm-error">{error}</p>}
              <button
                type="button"
                className="btn-outline btn-sm"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
              <button className="btn-dark btn-sm" disabled={saving}>
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResourceManager;
