import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import MobileNavbar from './MobileNavbar';
import PillButton from './PillButton';
import SectionHeading from './SectionHeading';
import studentBackground from '../assets/student_bg.svg'; // Import background image
import sWhiteIcon from '../assets/s_white.svg'; // Import icons for sections
import girlHeadphone from '../assets/girl_headphone.svg'; // Import section icon
import lightbulb from '../assets/lightbulb.svg'; // Overlay icon
import drink from '../assets/drink.svg'; // Overlay icon
import splash from '../assets/splash.svg'; // Overlay icon

const StudentDashboard = ({ onStartWeeklyQuiz, onViewRanking, onViewCompletedQuizzes, handleNavigation }) => {
  // Links specific to the Student Dashboard
  const studentLinks = [
    { label: 'Välj Din Quiz', path: 'WeeklyQuizSelection' },
    { label: 'Färdiga Quizzes', path: 'CompletedQuiz' },
    { label: 'Rank Mästare', path: 'Ranking' },
  ];

  return (
    <div
      className="student-view"
      style={{
        backgroundImage: `url(${studentBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Pass student-specific links to the MobileNavbar */}
      <MobileNavbar links={studentLinks} handleNavigation={handleNavigation} />
      
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
