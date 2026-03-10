const SCORING = [
  { criteria: "Database and table creation", points: 10 },
  { criteria: "Create function", points: 15 },
  { criteria: "Read / display function", points: 15 },
  { criteria: "Update function", points: 15 },
  { criteria: "Delete function", points: 15 },
  {
    criteria: "Code organization, conditionals, loops, and function usage",
    points: 15,
  },
  { criteria: "Output, messages, and error handling", points: 15 },
];

const ScoringSection = () => {
  const total = SCORING.reduce((sum, r) => sum + r.points, 0);
  return (
    <div className="instr-block">
      <p className="instr-label">Scoring Guide</p>
      <div className="instr-score-table">
        <div className="instr-score-row instr-score-row--head">
          <span className="instr-score-head-cell">Criteria</span>
          <span className="instr-score-head-cell">Pts</span>
        </div>

        {SCORING.map(({ criteria, points }, i) => (
          <div
            key={criteria}
            className={`instr-score-row ${i % 2 !== 0 ? "instr-score-row--alt" : ""}`}
          >
            <span className="instr-score-criteria">{criteria}</span>
            <span className="card-tag">{points}</span>
          </div>
        ))}

        <div className="instr-score-row instr-score-row--total">
          <span className="instr-score-total-label">Total (excl. bonus)</span>
          <span className="card-tag">{total}</span>
        </div>

        <div className="instr-score-row">
          <span className="instr-score-bonus-label">Bonus Points</span>
          <span className="card-tag">+25</span>
        </div>
      </div>
    </div>
  );
};

export default ScoringSection;
