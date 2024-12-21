import React, { useState } from 'react'; 
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import MobileNavbar from './MobileNavbar';
import PillButton from './PillButton';
import Quiz from './Quiz';
import studentBackground from '../assets/student_bg.svg';
import '../index.css';
import recycleIcon from '../assets/logo_climate.svg';
import kWhiteIcon from '../assets/k_white.svg';
import SectionHeading from './SectionHeading';

const StudentDashboard = () => {
  const [showQuiz, setShowQuiz] = useState(false); 

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  return (
    <div className="student-view"
    style={{
      backgroundImage: `url(${studentBackground})`,
    }}>
  
      <MobileNavbar />
      
      {!showQuiz && (
        <div className="dashboard-parent">
          <div className="dashboard-container">
            <SectionHeading
              mainIcon={kWhiteIcon}
              mainText="tudent"
              subText="Hörnan"
              subIcon={recycleIcon}
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
        </div>
      )}
      
      {showQuiz && (
        <Quiz onClose={handleCloseQuiz} />
      )}
    </div>
  );
};

export default StudentDashboard;