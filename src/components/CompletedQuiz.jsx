import React, { useEffect, useState } from 'react';
import { getCompletedQuizzes } from '../firebaseHelpers'; // Hämtar slutförda quiz
import studentBackground from '../assets/student_bg.svg'; // Bakgrundsbild för studentvy
import MobileNavbar from './MobileNavbar'; // Komponent för mobilnavigering
import SectionHeading from './SectionHeading'; // Komponent för avsnittsrubrik
import green_mind from '../assets/green_mind.svg'; // Ikon för avsnittsrubrik
import fWhiteIcon from '../assets/f_white.svg'; // Ikon för avsnittsrubrik
import SubHeading from './SubHeading'; // Komponent för underrubrik
import FilterButton from './FilterButton'; // Knapp för att filtrera quiz
import PillButton from './PillButton'; // Knapp för att navigera tillbaka till instrumentpanelen
import { faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons'; // Importera vänster- och högerpilar
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesome för ikoner

const CompletedQuiz = ({ userId, onBackToDashboard, onViewQuizDetails, handleNavigation }) => {
  const [completedQuizzes, setCompletedQuizzes] = useState([]); // State för att lagra slutförda quiz
  const [isDescending, setIsDescending] = useState(false); // För att sortera efter poäng, initialt inställd på false
  const [isNameDescending, setIsNameDescending] = useState(false); // För att sortera efter datum, initialt inställd på false
  const [currentPage, setCurrentPage] = useState(1); // Håller koll på aktuell sida för paginering

  const quizzesPerPage = 4; // Antal quiz som visas per sida

  // Mappar quizId till de faktiska quiznamnen för visning
  const quizNames = {
    quiz1: "Klimatkaos: Vad Vet Du Om Världens Förändring?",
    quiz2: "Havet Uteblir: Kan Du Rädda Stränderna?",
    quiz3: "Isjakt: Hur Mycket Vet Du Om Glaciärer?",
    quiz4: "CO2-Utmaningen: Vad Kan Du Om Fossila Bränslen?"
  };

  // Hämtar slutförda quiz från Firestore när komponenten laddas
  useEffect(() => {
    const fetchCompletedQuizzes = async () => {
      try {
        const quizzes = await getCompletedQuizzes(userId); // Hämtar slutförda quiz baserat på userId
        setCompletedQuizzes(quizzes); // Lagrar de slutförda quiz i state
      } catch (error) {
        console.error("Error fetching completed quizzes:", error); // Loggar eventuella fel om hämtningen misslyckas
      }
    };

    fetchCompletedQuizzes(); // Anropar funktionen för att hämta de slutförda quiz
  }, [userId]); // Kör om den här effekten varje gång `userId` ändras

  // Hanterar sortering av quiz baserat på Resultat (poäng)
  const handleResultFilter = () => {
    setIsDescending((prev) => !prev); // Växla sorteringsordning
    const sortedQuizzes = [...completedQuizzes].sort((a, b) =>
      isDescending
        ? b.score - a.score // Om det är i fallande ordning, sortera quiz efter högsta poäng
        : a.score - b.score // Om det är i stigande ordning, sortera quiz efter lägsta poäng
    );
    setCompletedQuizzes(sortedQuizzes); // Uppdatera state med sorterade quiz
  };

  // Hanterar sortering av quiz baserat på Datum
  const handleNameFilter = () => {
    setIsNameDescending((prev) => !prev); // Växla sorteringsordning efter datum
    const sortedQuizzes = [...completedQuizzes].sort((a, b) =>
      isNameDescending
        ? new Date(b.completedAt) - new Date(a.completedAt) // Om det är i fallande ordning, sortera efter senaste datum först
        : new Date(a.completedAt) - new Date(b.completedAt) // Om det är i stigande ordning, sortera efter tidigaste datum först
    );
    setCompletedQuizzes(sortedQuizzes); // Uppdatera state med sorterade quiz
  };

  // Paginering: Hämta quiz för aktuell sida
  const indexOfLastQuiz = currentPage * quizzesPerPage; // Index för det sista quizet på aktuell sida
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage; // Index för det första quizet på aktuell sida
  const currentQuizzes = completedQuizzes.slice(indexOfFirstQuiz, indexOfLastQuiz); // Hämta quiz för aktuell sida

  // Hanterar att gå till nästa sida
  const nextPage = () => {
    if (currentPage * quizzesPerPage < completedQuizzes.length) {
      setCurrentPage((prev) => prev + 1); // Öka den aktuella sidan om det finns fler quiz att visa
    }
  };

  // Hanterar att gå till föregående sida
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1); // Minska den aktuella sidan om den är större än 1
    }
  };

  return (
    <div
      className="teacher-view" // Container med klass som anger lärarens vy
      style={{
        backgroundImage: `url(${studentBackground})`, // Bakgrundsbild för sidan
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Mobilnavigering med rätt länkar */}
      <MobileNavbar
        links={[
          { label: 'Student Hörnan', path: 'StudentDashboard' }, // Länk till Student Dashboard
          { label: 'Välj Din Quiz', path: 'WeeklyQuizSelection' }, // Länk till Weekly Quiz Selection
          { label: 'Rank Mästare', path: 'Ranking' }, // Länk till Ranking-sidan
        ]}
        handleNavigation={handleNavigation} // Skicka handleNavigation-funktionen till Navbar
      />
      
      <div className="finishedquiz-container">
        {/* Sektionens rubrik */}
        <SectionHeading
          mainIcon={fWhiteIcon}
          mainText="ärdiga"
          subText="Quizzes"
          subIcon={green_mind}
        />
        
        {/* Filterknappar för att sortera quiz */}
        <div className="filter-container">
          <SubHeading text="Sortera" /> {/* Underrubrik för filteralternativ */}
          <FilterButton
            label="Resultat"
            isDescending={isDescending}
            onFilter={handleResultFilter} // Trigga sortering efter poäng när den klickas
          />
          <FilterButton
            label="Datum"
            isDescending={isNameDescending}
            onFilter={handleNameFilter} // Trigga sortering efter datum när den klickas
          />
        </div>

        {/* Visar meddelande om inga quiz hittas */}
        {completedQuizzes.length === 0 ? (
          <p>Du har inte gjort några Quiz än, börja nu för att få en rank bland mästarna.</p> // Meddelande om inga slutförda quiz finns
        ) : (
          <ul className="completed-quizzes-list">
            {/* Loopa genom de slutförda quiz och visa dem */}
            {currentQuizzes.map((quiz) => (
              <li key={quiz.completedQuizId}>
                {/* Visa quiznamn och slutförandedatum */}
                <p>
                  <strong>Quiz namn:</strong> {quizNames[quiz.quizId]} {/* Visa quiznamnet */}
                </p>
                <p>
                  <strong>Avklarad den:</strong> {new Date(quiz.completedAt).toLocaleString()} {/* Visa datum */}
                </p>
                <p>
                  <strong>Antal rätt svar:</strong> {quiz.score}/{quiz.totalQuestions} {/* Visa antal rätt svar */}
                </p>

                {/* Knapp för att visa quizdetaljer */}
                <button
                  onClick={() => onViewQuizDetails(quiz.quizId, quiz.completedQuizId)} // Trigga visning av quizdetaljer
                  className="quiz-details-button"
                >
                  Visa Detaljer {/* Knapptext */}
                  {/* Lägg till FontAwesome högerpilikon efter texten */}
                  <FontAwesomeIcon icon={faCircleRight} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Paginering-knappar */}
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Föregående</button> {/* "Föregående" knapp */}
          <button onClick={nextPage} disabled={currentPage * quizzesPerPage >= completedQuizzes.length}>Nästa</button> {/* "Nästa" knapp */}
        </div>

        {/* Centera PillButton */}
        <div className="pill-button-container">
          <PillButton
            text="Tillbaka till Startsida"
            icon={faCircleLeft}
            onClick={onBackToDashboard} // Trigga funktionen för att gå tillbaka till startsidan
          />
        </div>
      </div>
    </div>
  );
};

export default CompletedQuiz;
