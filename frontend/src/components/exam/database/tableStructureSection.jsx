const TABLE_STRUCTURES = [
  {
    system: "Student Record System",
    database: "student_record_db",
    table: "students",
    fields: ["id", "student_no", "full_name", "course", "year_level", "status"],
  },
  {
    system: "Book Library System",
    database: "library_db",
    table: "books",
    fields: [
      "id",
      "book_title",
      "author",
      "category",
      "year_published",
      "status",
    ],
  },
  {
    system: "Product Inventory System",
    database: "inventory_db",
    table: "products",
    fields: ["id", "product_name", "category", "price", "stock_qty", "status"],
  },
  {
    system: "Employee Directory System",
    database: "employee_db",
    table: "employees",
    fields: [
      "id",
      "employee_no",
      "full_name",
      "department",
      "position",
      "status",
    ],
  },
];

const TableStructureSection = () => (
  <div className="instr-block">
    <p className="instr-label">Table Structure</p>
    <p className="instr-table-desc">
      Create at least one main table based on the suggested structure.
    </p>

    <div className="table-container">
      {TABLE_STRUCTURES.map(({ system, database, table, fields }) => (
        <div key={system} className="instr-code">
          <p className="instr-code-name">{system}</p>
          <p className="instr-code-field">
            <span>›</span>
            Database: {database}
          </p>
          <p className="instr-code-field">
            <span>›</span>
            Table: {table}
          </p>
          {fields.map((field) => (
            <p key={field} className="instr-code-field">
              <span>›</span>
              {field}
            </p>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default TableStructureSection;
