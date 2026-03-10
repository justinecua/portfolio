import ThemeSection from "./themeSection";
import TasksSection from "./taskSection";
import TableStructureSection from "./tableStructureSection";
import BonusSection from "./bonusSection";
import ScoringSection from "./scoringSection";
import SubmissionSection from "./submissionSection";

const Instructions = () => (
  <div className="instr-wrap">
    <div className="instr-header">
      <h1 className="instr-title">SEMI FINAL EXAMINATION</h1>
      <div className="instr-meta">
        <p className="instr-eyebrow">
          IT 212 / CS 212 - Fundamentals of Database
        </p>
      </div>
    </div>

    <ThemeSection />
    <TasksSection />
    <TableStructureSection />
    <BonusSection />
    <ScoringSection />
    <SubmissionSection />
  </div>
);

export default Instructions;
