import React, { useState } from 'react';  
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import MobileNavbar from './MobileNavbar';
import PillButton from './PillButton';
import Quiz from './Quiz';
import studentBackground from '../assets/student_bg.svg';
import '../index.css';
import girlHeadphone from '../assets/girl_headphone.svg';
import sWhiteIcon from '../assets/s_white.svg';
import lightbulb from '../assets/lightbulb.svg';
import drink from '../assets/drink.svg';
import splash from '../assets/splash.svg';
import SectionHeading from './SectionHeading';

const StudentDashboard = ({ onStartQuiz, onViewRanking }) => { // Accept new prop
  return (
    <div
      className="student-view"
      style={{
        backgroundImage: `url(${studentBackground})`,
      }}
    >
      <MobileNavbar />
      <div className="dashboard-wrapper">
        <div className="dashboard-container">
          <SectionHeading
            mainIcon={sWhiteIcon}
            mainText="tudent"
            subText="Hörnan"
            subIcon={girlHeadphone}
          />
          <PillButton
            text="Veckans Quiz"
            icon={faCircleRight}
            onClick={onStartQuiz} // Navigate to Quiz
          />
          <PillButton
            text="Färdiga Quiz"
            icon={faCircleRight}
            onClick={() => console.log('Färdiga Quiz')}
          />
          <PillButton
            text="Rank Mästare"
            icon={faCircleRight}
            onClick={onViewRanking} // Navigate to Ranking
          />
        </div>

        {/* Overlay SVGs */}
        <img src={lightbulb} alt="Lightbulb" className="dashboard-lightbulb" />
        <img src={drink} alt="Drink" className="dashboard-drink" />
        <img src={splash} alt="Splash" className="dashboard-splash" />
      </div>
    </div>
  );
};

export default StudentDashboard;
