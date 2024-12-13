import React from 'react';

const Table = ({ headers, rows, renderCell }) => {
  return (
    <div className="table-container">
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
