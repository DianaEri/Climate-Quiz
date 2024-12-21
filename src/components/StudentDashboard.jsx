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

const StudentDashboard = () => {
  const [showQuiz, setShowQuiz] = useState(false); 

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  return (
    <div
      className="student-view"
      style={{
        backgroundImage: `url(${studentBackground})`,
      }}
    >
      <MobileNavbar />
      
      {!showQuiz && (
        <div className="dashboard-wrapper">
          {/* Dashboard Container */}
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
              onClick={() => {
                console.log('Clicked Veckans Quiz button');
                setShowQuiz(true); 
              }}
            />
            <PillButton
              text="Färdiga Quiz"
              icon={faCircleRight}
              onClick={() => console.log('Färdiga Quiz')}
            />
            <PillButton
              text="Total rankning"
              icon={faCircleRight}
              onClick={() => console.log('Total rankning')}
            />
          </div>

          {/* Overlay SVGs */}
          <img src={lightbulb} alt="Lightbulb" className="dashboard-lightbulb" />
          <img src={drink} alt="Drink" className="dashboard-drink" />
          <img src={splash} alt="Splash" className="dashboard-splash" />
        </div>
      )}

      {showQuiz && (
        <Quiz onClose={handleCloseQuiz} />
      )}
    </div>
  );
};

export default StudentDashboard;
