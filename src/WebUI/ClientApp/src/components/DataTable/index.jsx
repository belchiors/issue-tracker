function DataTable(props) {
  return (
    <table className="table table-hover lg-table nowrap">
      <thead className="table-dark">
        <tr className="text-center">
          {props.columns.map((col, index) => <th key={index}>{col.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {props.data.map((row, index) => 
          <tr key={index}>
            {props.columns.map((col, index) => 
              <td key={index} className="text-center">{row[col.field]}</td>)}
          </tr>)}
      </tbody>
    </table>
  );
}

export default DataTable;