import React from 'react'; // Importerar React för att använda JSX och skapa komponenter

// Komponent som renderar en tabell med dynamiskt definierade rubriker, rader och cellinnehåll.
const Table = ({ headers, rows, renderCell, style }) => {
  return (
    <div className="table-container" style={style}>
      <table className="dashboard-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th> 
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="data-row">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  {renderCell ? renderCell(cell, rowIndex, cellIndex) : cell} 
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
