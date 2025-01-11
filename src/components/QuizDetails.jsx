import React, { useEffect, useState } from 'react';
import { getQuizDetails } from '../firebaseHelpers'; // Hämtar quizdetaljer från Firebase
import studentBackground from '../assets/student_bg.svg'; // Bakgrundsbild för studentvy
import MobileNavbar from './MobileNavbar'; // Importerar mobilmenyn
import PillButton from './PillButton'; // Importerar PillButton-komponenten för att gå tillbaka
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'; // Ikon för att gå tillbaka
import SectionHeading from './SectionHeading'; // Importerar komponent för rubrik
import hand_lightbulb from '../assets/hand_lightbulb.svg'; // Ikon för sektion
import qWhiteIcon from '../assets/q_white.svg'; // Ikon för quiz

function QuizDetails({ userId, quizId, completedQuizId, onBackToCompletedQuizzes, handleNavigation }) {
  const [quizDetails, setQuizDetails] = useState(null); // Håller quizdetaljer i state
  const [loading, setLoading] = useState(true); // Håller koll på om data laddas
  const [error, setError] = useState(null); // Håller koll på eventuella fel

  const [filter, setFilter] = useState('all'); // Håller koll på vilken filter som används

  // Quiznamn för att koppla rätt namn till varje quizId
  const quizNames = {
    quiz1: "Klimatkaos: Vad Vet Du Om Världens Förändring?",
    quiz2: "Havet Uteblir: Kan Du Rädda Stränderna?",
    quiz3: "Isjakt: Hur Mycket Vet Du Om Glaciärer?",
    quiz4: "CO2-Utmaningen: Vad Kan Du Om Fossila Bränslen?"
  };

  // Hämta quizdetaljer från Firebase när komponenten mountas
  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await getQuizDetails(quizId, userId, completedQuizId);
        console.log("Fetched quiz details:", data); // Loggar quizdetaljer
        setQuizDetails(data); // Sätter quizdetaljer i state
      } catch (error) {
        console.error("Error fetching quiz details:", error.message); // Loggar fel om något går fel
        setError(error.message); // Sätter felmeddelande
      } finally {
        setLoading(false); // Sätter loading till false när datan har hämtats
      }
    }
    fetchDetails(); // Anropar funktionen för att hämta quizdetaljer
  }, [quizId, userId, completedQuizId]);

  // Om quizdetaljer inte är hämtade eller om det finns ett fel, visa meddelande
  if (loading) {
    return <p>Laddar quizdetaljer...</p>;
  }

  if (error) {
    return <p>Error loading quiz details: {error}</p>;
  }

  if (!quizDetails || !quizDetails.questions) {
    return <p>Quizdetaljer kunde inte laddas. Kontrollera dina valda uppgifter.</p>;
  }

  // Filtrera frågorna baserat på användarens valda filter (korrekta, felaktiga eller alla)
  const filteredQuestions = quizDetails.questions.filter((question) => {
    const userAnswerDetails = quizDetails.userAnswers.find(
      (ans) => ans.questionId === question.id
    );
    const userAnswer = userAnswerDetails?.userAnswer;

    if (filter === 'correct') {
      return userAnswer === question.correctAnswer; // Filtrera korrekt svar
    } else if (filter === 'incorrect') {
      return userAnswer !== question.correctAnswer; // Filtrera felaktiga svar
    } else {
      return true; // Visa alla svar
    }
  });

  return (
    <div className="teacher-view" style={{ backgroundImage: `url(${studentBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <MobileNavbar 
        links={[
          { label: 'Student Hörnan', path: '/StudentDashboard' }, // Länk till StudentDashboard
          { label: 'Välj Din Quiz', path: '/WeeklyQuizSelection' }, // Länk till WeeklyQuizSelection
          { label: 'Färdiga Quizzes', path: '/CompletedQuiz' }, // Länk till CompletedQuiz
          { label: 'Rank Mästare', path: '/Ranking' }, // Länk till Ranking
        ]}
        handleNavigation={handleNavigation} // Passar handleNavigation för navigation
      />
      <div className="details-container">
        <SectionHeading
          mainIcon={qWhiteIcon}
          mainText="uiz"
          subText="Detaljer"
          subIcon={hand_lightbulb}
        />
        <p><strong>Quiz namn:</strong> {quizNames[quizDetails.quizId]}</p> {/* Visar quiznamnet */}
        <p><strong>Antal rätt svar:</strong> {quizDetails.score}/{quizDetails.totalQuestions}</p> {/* Visar antal rätta svar */}
        
        <p><strong>Välj för att visa:</strong></p> {/* Välj filter */}
        <div className="detail-buttons">
          <button 
            className={`detail-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Alla svar
          </button>
          <button 
            className={`detail-button ${filter === 'correct' ? 'active' : ''}`}
            onClick={() => setFilter('correct')}
          >
            Alla korrekta svar
          </button>
          <button 
            className={`detail-button ${filter === 'incorrect' ? 'active' : ''}`}
            onClick={() => setFilter('incorrect')}
          >
            Alla fel svar
          </button>
        </div>

        {/* Lista med filtrerade frågor */}
        <ol>
          {filteredQuestions.map((question, index) => {
            const userAnswerDetails = quizDetails.userAnswers.find(
              (ans) => ans.questionId === question.id
            );
            const userAnswer = userAnswerDetails?.userAnswer || "Ingen svar"; // Sätt användarsvaret eller "Ingen svar" om inget finns

            return (
              <li key={index}>
                <p>{question.text}</p> {/* Visar frågan */}
                <p><strong>Rätt svar:</strong> {question.correctAnswer}</p> {/* Visar rätt svar */}
                <p><strong>Ditt svar:</strong> {userAnswer}</p> {/* Visar användarens svar */}
                <p>
                  {userAnswer === question.correctAnswer
                    ? "✔️ Korrekt!" // Om användarens svar är korrekt
                    : "❌ Fel."} // Om användarens svar är fel
                </p>
              </li>
            );
          })}
        </ol>

        {/* Knapp för att gå tillbaka till färdiga quizzes */}
        <div className="pill-button-container">
          <PillButton
            text="Tillbaka till Färdiga Quizzes"
            icon={faCircleLeft}
            onClick={onBackToCompletedQuizzes}
          />
        </div>
      </div>
    </div>
  );
}

export default QuizDetails; // Exporterar QuizDetails-komponenten
