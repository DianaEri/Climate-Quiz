import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareUpRight, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import studentBackground from '../assets/student_bg.svg';
import MobileNavbar from './MobileNavbar';
import PillButton from './PillButton';
import SectionHeading from './SectionHeading';
import vWhiteIcon from '../assets/v_white.svg';
import medal from '../assets/megaphone.svg';
import SubHeading from './SubHeading';

// WeeklyQuizSelection-komponenten används för att visa en lista över tillgängliga quiz att spela
// Den tar emot olika funktioner som props för att hantera quizval och navigering
const WeeklyQuizSelection = ({ 
  onSelectQuiz, // Funktion som körs när ett quiz väljs
  onBackToDashboard, // Funktion som körs för att gå tillbaka till startsidan
  onViewCompletedQuizzes, // Funktion för att visa färdiga quiz (ej använd här)
  onViewRanking, // Funktion för att visa ranking (ej använd här)
  handleNavigation // Funktion för att hantera navigering mellan sidor
}) => {
  // State för att hålla quizdata och unika quiz
  const [quizData, setQuizData] = useState([]);
  const [uniqueQuizzes, setUniqueQuizzes] = useState([]);

  // useEffect-hooken används för att hämta quizdata från en JSON-fil när komponenten laddas
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("/quizData.json"); // Hämtar quizdata från en JSON-fil
        if (!response.ok) {
          throw new Error(`Failed to fetch quiz data: ${response.statusText}`); // Om det är ett fel i svaret
        }
        const data = await response.json(); // Om hämtningen lyckas, konvertera svaret till JSON

        // Namn på olika quiz
        const quizNames = {
          quiz1: "Klimatkaos: Vad Vet Du Om Världens Förändring?",
          quiz2: "Havet Uteblir: Kan Du Rädda Stränderna?",
          quiz3: "Isjakt: Hur Mycket Vet Du Om Glaciärer?",
          quiz4: "CO2-Utmaningen: Vad Kan Du Om Fossila Bränslen?"
        };

        // Skapar en lista med unika quiz-ID:n
        const uniqueQuizIds = Array.from(new Set(data.map((quiz) => quiz.quizId)));
        // Skapar ett objekt för varje unikt quiz
        const uniqueQuizObjects = uniqueQuizIds.map((id) => ({
          quizId: id,
          name: quizNames[id] || `Quiz ${id.replace("quiz", "")}`,
        }));

        // Uppdaterar state med quizdata
        setQuizData(data);
        setUniqueQuizzes(uniqueQuizObjects);
      } catch (error) {
        console.error("Error fetching quiz data:", error); // Fångar och loggar eventuella fel vid hämtning
      }
    };

    fetchQuizData(); // Anropar funktionen för att hämta quizdata
  }, []); // Denna useEffect körs bara en gång när komponenten laddas

  return (
    <div
      className="student-view" // CSS-klass för studentvyn
      style={{
        backgroundImage: `url(${studentBackground})`, // Använder en bakgrundsbild från assets
        backgroundSize: 'cover', // Gör så att bakgrundsbilden täcker hela vyn
        backgroundPosition: 'center', // Centrerar bakgrundsbilden
      }}
    >
      <MobileNavbar
        links={[
          { label: 'Student Hörnan', path: 'StudentDashboard' },  // Navigationslänkar för mobilmenyn
          { label: 'Färdiga Quizzes', path: 'CompletedQuiz' },
          { label: 'Rank Mästare', path: 'Ranking' }
        ]}
        handleNavigation={handleNavigation} // Passar in navigeringsfunktionen till MobileNavbar
      />
      
      <div className="choice-container"> {/* Container för quizval */}
        <SectionHeading
          mainIcon={vWhiteIcon} // Huvudikon för rubriken
          mainText="älj" // Huvudtext för rubriken
          subText="Quiz" // Undertitel för rubriken
          subIcon={medal} // Underikon för rubriken
        />
        <SubHeading text="Välj en quiz att spela:" className="subheading-left" /> {/* Underrubrik */}
        <div className="quizchoice-container"> {/* Container för quizval */}
          {uniqueQuizzes.map((quiz) => ( // Itererar genom varje unikt quiz
            <button
              onClick={() => onSelectQuiz(quiz.quizId)} // När en quizknapp klickas, anropas onSelectQuiz med quizID
              key={quiz.quizId} // Unikt nyckelvärde för varje knapp
              className="quiz-button" // CSS-klass för quizknappen
            >
              {quiz.name} {/* Viser quiznamnet */}
              <FontAwesomeIcon 
                icon={faSquareUpRight} // Ikon som visas till höger på knappen
                className="quiz-button-icon" // CSS-klass för quizikon
              />
            </button>
          ))}
        </div>
        <PillButton
          text="Tillbaka till Startsida" // Text på knappen
          icon={faCircleLeft} // Ikon på knappen
          onClick={onBackToDashboard} // När knappen klickas, anropas onBackToDashboard
        />
      </div>
    </div>
  );
};

export default WeeklyQuizSelection; // Exporterar WeeklyQuizSelection-komponenten så att den kan användas i andra delar av appen
