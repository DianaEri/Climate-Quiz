import React, { useState } from 'react'; 
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';
import MobileNavbar from './MobileNavbar';
import PillButton from './PillButton';
import Quiz from './Quiz';
import studentBackground from '../assets/student_bg.svg';
import '../index.css';

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
            <PillButton
              text="Veckans Quiz"
              icon={faCircleUp}
              onClick={() => {
                console.log('Clicked Veckans Quiz button');
                setShowQuiz(true); 
              }}
            />
            <PillButton
              text="Färdiga Quiz"
              icon={faCircleUp}
              onClick={() => console.log('Färdiga Quiz')}
            />
            <PillButton
              text="Total rankning"
              icon={faCircleUp}
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