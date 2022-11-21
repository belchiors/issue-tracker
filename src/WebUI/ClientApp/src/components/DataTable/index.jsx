import "./styles.css";

function DataTable(props) {
  return (
    <div className="">
      <table className="table table-striped">
        <thead>
          <tr>
            {props.columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.dataSource.map((row, index) => (
            <tr key={index}>
              {props.columns.map((col, index) => (
                <td key={index}>
                  {col.render ? col.render(row) : row[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
