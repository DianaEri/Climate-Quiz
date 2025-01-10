import React from 'react';
import { useNavigate } from 'react-router-dom';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons'; // Import faCircleRight
import MobileNavbar from './MobileNavbar';
import PillButton from './PillButton';
import studentBackground from '../assets/student_bg.svg';
import '../index.css';
import girlHeadphone from '../assets/girl_headphone.svg';
import sWhiteIcon from '../assets/s_white.svg';
import lightbulb from '../assets/lightbulb.svg';
import drink from '../assets/drink.svg';
import splash from '../assets/splash.svg';
import SectionHeading from './SectionHeading';

const StudentDashboard = ({ onStartWeeklyQuiz, onViewRanking, onViewCompletedQuizzes }) => {
  const navigate = useNavigate();

  const studentLinks = [
    { label: 'Student Hörnan', action: () => navigate('/StudentDashboard') },
    { label: 'Välj Din Quiz', action: onStartWeeklyQuiz },
    { label: 'Färdiga Quizzes', action: onViewCompletedQuizzes },
    { label: 'Rank Mästare', action: onViewRanking },
  ];

  return (
    <div
      className="student-view"
      style={{
        backgroundImage: `url(${studentBackground})`,
      }}
    >
      <MobileNavbar links={studentLinks} />
      <div className="dashboard-wrapper">
        <div className="dashboard-container">
          <SectionHeading
            mainIcon={sWhiteIcon}
            mainText="tudent"
            subText="Hörnan"
            subIcon={girlHeadphone}
          />
          <PillButton
            text="Välj Din Quiz"
            icon={faCircleRight}
            onClick={onStartWeeklyQuiz}
          />
          <PillButton
            text="Färdiga Quizzes"
            icon={faCircleRight}
            onClick={onViewCompletedQuizzes}
          />
          <PillButton
            text="Rank Mästare"
            icon={faCircleRight}
            onClick={onViewRanking}
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
