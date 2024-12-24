import React from 'react';
import MobileNavbar from './MobileNavbar';
import PillButton from './PillButton'; // Import the PillButton component
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'; // Import the left arrow icon
import '../index.css';
import studentBackground from '../assets/student_bg.svg';
import SectionHeading from './SectionHeading';
import girlHeadphone from '../assets/girl_headphone.svg';
import sWhiteIcon from '../assets/s_white.svg';
import SubHeading from './SubHeading';

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
            mainText="ank"
            subText="Mästare"
            subIcon={girlHeadphone}
          />
          <SubHeading text="Din totala ranking och resultat" />
          <div class="ranking-row">
            <div class="ranking-entry">
              <span class="ranking-position">16.</span>
              <span class="ranking-name">William Danielsson</span>
              <span class="ranking-score">61%</span>
            </div>
          </div>
          <p className="ranking-subheading">
            Du har tjänat Cykelbrickan för att ha varit en snabb 
            quizmästare och klarat dina quiz på under 5 minuter! 
            Satsa på topp tio för att låsa upp en medaljbricka.
          </p>
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
