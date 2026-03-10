import { useState } from "react";

const BONUS_POINTS = [
  { label: "+5 pts", desc: "2 related tables" },
  { label: "+10 pts", desc: "3 related tables" },
  { label: "+5 pts", desc: "Working JOIN display" },
  { label: "+5 pts", desc: "Foreign keys" },
];

const BONUS_EXAMPLES = [
  {
    label: "Student Enrollment System",
    tables: "students, courses, enrollments",
  },
  {
    label: "Library Borrowing System",
    tables: "books, borrowers, borrow_records",
  },
  { label: "Employee Task System", tables: "employees, departments, tasks" },
];

const BonusSection = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="instr-block">
      <div className={`instr-bonus-header ${open ? "open" : ""}`}>
        <p className="instr-label">Additional Points</p>
        <button className="instr-bonus-toggle" onClick={() => setOpen(!open)}>
          {open ? "hide" : "show"}
        </button>
      </div>

      {open && (
        <div className="instr-bonus-body">
          <div className="instr-bonus-points">
            {BONUS_POINTS.map(({ label, desc }) => (
              <div key={desc} className="instr-bonus-point">
                <span className="instr-bonus-pts">{label}</span>
                <span className="instr-bonus-desc">{desc}</span>
              </div>
            ))}
          </div>

          <div>
            <p className="instr-bonus-examples-label">
              Example for additional points
            </p>
            {BONUS_EXAMPLES.map(({ label, tables }) => (
              <div key={label} className="instr-bonus-example">
                <span className="instr-bonus-example-label">{label}</span>
                <span className="instr-bonus-example-tables">{tables}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BonusSection;
