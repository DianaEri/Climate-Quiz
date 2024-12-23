import React from 'react';
import MobileNavbar from './MobileNavbar';
import '../index.css';
import studentBackground from '../assets/student_bg.svg';

const Ranking = ({ onBackClick }) => {
  return (
    <div
      className="student-view" // Reuse the same class for consistent styling
      style={{
        backgroundImage: `url(${studentBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <MobileNavbar />
      <div className="dashboard-wrapper"> {/* Optional wrapper for consistent spacing */}
        <div className="dashboard-container"> {/* Reuse container styling */}
          <button className="back-button" onClick={onBackClick}>
            Tillbaka
          </button>
          <h1 className="ranking-heading">Ranking</h1>
          <p className="ranking-subheading">Här är dina toppresultat och klassjämförelse</p>
          <table className="ranking-table">
            <thead>
              <tr>
                <th>Placering</th>
                <th>Student</th>
                <th>Resultat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Oliver Ekström</td>
                <td>98%</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Emma Karlsson</td>
                <td>96%</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Amir Hassan</td>
                <td>95%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
