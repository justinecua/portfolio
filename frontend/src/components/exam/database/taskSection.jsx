const TASKS = [
  "Create a MySQL database and table for your chosen system.",
  "Connect your project to the database using MySQLi.",
  "Create a form to add a new record.",
  "Display all records in a table.",
  "Edit and update an existing record.",
  "Delete a record.",
  "Use at least one function in your PHP code.",
  "Use conditionals and loops.",
  "Show a message when no records are found and when data is updated, inserted or deleted",
];

const TasksSection = () => (
  <div className="instr-block">
    <p className="instr-label">Required Tasks</p>
    {TASKS.map((task, i) => (
      <div key={i} className="instr-task">
        <span className="instr-task-num">{String(i + 1).padStart(2, "0")}</span>
        <span className="instr-task-text">{task}</span>
      </div>
    ))}
  </div>
);

export default TasksSection;
