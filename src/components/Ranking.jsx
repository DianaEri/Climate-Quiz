import React from 'react';
import MobileNavbar from './MobileNavbar';
import PillButton from './PillButton'; // Import the PillButton component
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'; // Import the left arrow icon
import '../index.css';
import studentBackground from '../assets/student_bg.svg';
import SectionHeading from './SectionHeading';
import medal from '../assets/medal.svg';
import rWhiteIcon from '../assets/r_white.svg';
import SubHeading from './SubHeading';
import bicycleSvg from '../assets/bicycle.svg';

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
      <div className="ranking-container">
      <SectionHeading
        mainIcon={rWhiteIcon}
        mainText="ank"
        subText="Mästare"
        subIcon={medal}
      />
      <SubHeading text="Din totala ranking och resultat" />
      <div className="ranking-row">
        <div className="ranking-entry">
          <span className="ranking-position">16.</span>
          <span className="ranking-name">William Danielsson</span>
          <span className="ranking-score">61%</span>
        </div>
      </div>
      <p className="ranking-subheading">
        Du har tjänat Cykelbrickan för att ha varit en snabb quizmästare och klarat dina quiz på under 5 minuter! 
        Satsa på topp tio för att låsa upp en medaljbricka.
      </p>
      <div className="ranking-svg-row">
        <img src={bicycleSvg} alt="Bicycle Icon" className="bicycle-svg" />
      </div>
      <PillButton
        text="Tillbaka"
        icon={faCircleLeft}
        onClick={onBackClick}
      />
    </div>
    </div>
  );
};

export default Ranking;
