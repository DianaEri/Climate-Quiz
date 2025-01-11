import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import MobileNavbar from './MobileNavbar'; // Importerar MobileNavbar-komponenten
import PillButton from './PillButton'; // Importerar PillButton-komponenten
import SectionHeading from './SectionHeading'; // Importerar SectionHeading-komponenten
import studentBackground from '../assets/student_bg.svg'; // Importerar bakgrundsbilden
import sWhiteIcon from '../assets/s_white.svg'; // Importerar ikoner för sektioner
import girlHeadphone from '../assets/girl_headphone.svg'; // Importerar sektionens ikon
import lightbulb from '../assets/lightbulb.svg'; // Overlay-ikon
import drink from '../assets/drink.svg'; // Overlay-ikon
import splash from '../assets/splash.svg'; // Overlay-ikon

const StudentDashboard = ({ onStartWeeklyQuiz, onViewRanking, onViewCompletedQuizzes, handleNavigation }) => {
  // Länkar specifika för Student Dashboard
  const studentLinks = [
    { label: 'Välj Din Quiz', path: 'WeeklyQuizSelection' },
    { label: 'Färdiga Quizzes', path: 'CompletedQuiz' },
    { label: 'Rank Mästare', path: 'Ranking' },
  ];

  return (
    <div
      className="student-view"
      style={{
        backgroundImage: `url(${studentBackground})`, // Sätter bakgrundsbilden för studentvyn
        backgroundSize: 'cover', // Gör bakgrunden täckande
        backgroundPosition: 'center', // Centrera bakgrunden
      }}
    >
      {/* Passar student-specifika länkar till MobileNavbar-komponenten */}
      <MobileNavbar links={studentLinks} handleNavigation={handleNavigation} />
      
      <div className="dashboard-wrapper">
        <div className="dashboard-container">
          {/* Sektionens rubrik */}
          <SectionHeading
            mainIcon={sWhiteIcon} // Huvudikon
            mainText="tudent" // Huvudtext
            subText="Hörnan" // Underrubrik
            subIcon={girlHeadphone} // Underrubrikens ikon
          />
          {/* Knapp för att starta veckans quiz */}
          <PillButton
            text="Välj Din Quiz"
            icon={faCircleRight}
            onClick={onStartWeeklyQuiz}
          />
          {/* Knapp för att visa färdiga quiz */}
          <PillButton
            text="Färdiga Quizzes"
            icon={faCircleRight}
            onClick={onViewCompletedQuizzes}
          />
          {/* Knapp för att visa rankingen */}
          <PillButton
            text="Rank Mästare"
            icon={faCircleRight}
            onClick={onViewRanking}
          />
        </div>

        {/* Overlay SVG-ikoner */}
        <img src={lightbulb} alt="Lightbulb" className="dashboard-lightbulb" /> {/* Lyspär ikon */}
        <img src={drink} alt="Drink" className="dashboard-drink" /> {/* Drink ikon */}
        <img src={splash} alt="Splash" className="dashboard-splash" /> {/* Splash ikon */}
      </div>
    </div>
  );
};

export default StudentDashboard; // Exporterar StudentDashboard-komponenten
