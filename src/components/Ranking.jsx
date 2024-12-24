import React from 'react';
import MobileNavbar from './MobileNavbar';
import PillButton from './PillButton'; // Import the PillButton component
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'; // Import the left arrow icon
import '../index.css';
import studentBackground from '../assets/student_bg.svg';
import SectionHeading from './SectionHeading';
import girlHeadphone from '../assets/girl_headphone.svg';
import sWhiteIcon from '../assets/s_white.svg';

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
          <SectionHeading
            mainIcon={sWhiteIcon}
            mainText="anking"
            subText="Placering"
            subIcon={girlHeadphone}
          />
          <p className="ranking-subheading">Du har tjänat stjärnbrickan för att konsekvent ha uppnått över 60% rätt i resultat!</p>
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
          {/* Back Button with PillButton */}
          <PillButton
            text="Tillbaka"
            icon={faCircleLeft} // Use left-pointing arrow icon
            onClick={onBackClick} // Attach the click handler
          />
        </div>
      </div>
    </div>
  );
};

export default Ranking;
