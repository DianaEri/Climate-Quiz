import React from 'react';
import MobileNavbar from './MobileNavbar'; // Importerar MobileNavbar-komponenten
import PillButton from './PillButton'; // Importerar PillButton-komponenten
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'; // Importerar vänsterpil-ikonen
import '../index.css'; // Importerar CSS för styling
import studentBackground from '../assets/student_bg.svg'; // Importerar bakgrundsbild för studentvy
import SectionHeading from './SectionHeading'; // Importerar komponenten för rubriker
import medal from '../assets/medal.svg'; // Importerar medaljikon
import rWhiteIcon from '../assets/r_white.svg'; // Importerar vit ikon för rubrik
import SubHeading from './SubHeading'; // Importerar SubHeading-komponenten
import bicycleSvg from '../assets/bicycle.svg'; // Importerar cykelikon

const Ranking = ({ onBackClick, handleNavigation }) => {
  return (
    <div
      className="student-view" // Återanvänder samma klass för konsekvent styling
      style={{
        backgroundImage: `url(${studentBackground})`, // Sätter bakgrundsbild
        backgroundSize: 'cover', // Gör så att bakgrunden täcker hela fönstret
        backgroundPosition: 'center', // Centrerar bakgrunden
      }}
    >
      {/* Mobil-Navigering med länkar för Ranking */}
      <MobileNavbar
        links={[
          { label: 'Student Hörnan', path: 'StudentDashboard' }, // Länk till StudentDashboard
          { label: 'Välj Din Quiz', path: 'WeeklyQuizSelection' }, // Länk till WeeklyQuizSelection
          { label: 'Färdiga Quizzes', path: 'CompletedQuiz' }, // Länk till CompletedQuiz
        ]}
        handleNavigation={handleNavigation} // Passar med handleNavigation-funktionen här
      />
      
      <div className="ranking-container">
        {/* Rubriksektion */}
        <SectionHeading
          mainIcon={rWhiteIcon} // Huvudikon för rubriken
          mainText="ank" // Huvudtext för rubriken
          subText="Mästare" // Undertext för rubriken
          subIcon={medal} // Underikon för rubriken
        />
        <SubHeading text="Din totala ranking och resultat" /> {/* Underrubrik med text */}
        <div className="ranking-row">
          {/* Rankingrad för användaren */}
          <div className="ranking-entry">
            <span className="ranking-position">16.</span> {/* Placering */}
            <span className="ranking-name">William Danielsson</span> {/* Namn på användaren */}
            <span className="ranking-score">61%</span> {/* Poäng för användaren */}
          </div>
        </div>
        <p className="ranking-subheading">
          Du har tjänat Cykelbrickan för att ha varit en snabb quizmästare och klarat dina quiz på under 5 minuter! 
          Satsa på topp tio för att låsa upp en medaljbricka.
        </p> {/* Beskrivning av prestation */}
        <div className="ranking-svg-row">
          <img src={bicycleSvg} alt="Bicycle Icon" className="bicycle-svg" /> {/* Cykelikon */}
        </div>
        <PillButton
          text="Tillbaka" // Text för knappen
          icon={faCircleLeft} // Ikon för knappen
          onClick={onBackClick} // Anropar onBackClick-funktionen vid klick
        />
      </div>
    </div>
  );
};

export default Ranking; // Exporterar Ranking-komponenten
