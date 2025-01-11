import React, { useEffect, useState } from 'react';
import { getQuizDetails } from '../firebaseHelpers';
import studentBackground from '../assets/student_bg.svg';
import MobileNavbar from './MobileNavbar';
import PillButton from './PillButton';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'; 
import SectionHeading from './SectionHeading';
import hand_lightbulb from '../assets/hand_lightbulb.svg';
import qWhiteIcon from '../assets/q_white.svg';

function QuizDetails({ userId, quizId, completedQuizId, onBackToCompletedQuizzes, handleNavigation }) {
  const [quizDetails, setQuizDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filter, setFilter] = useState('all'); 

  const quizNames = {
    quiz1: "Klimatkaos: Vad Vet Du Om Världens Förändring?",
    quiz2: "Havet Uteblir: Kan Du Rädda Stränderna?",
    quiz3: "Isjakt: Hur Mycket Vet Du Om Glaciärer?",
    quiz4: "CO2-Utmaningen: Vad Kan Du Om Fossila Bränslen?"
  };

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await getQuizDetails(quizId, userId, completedQuizId);
        console.log("Fetched quiz details:", data);
        setQuizDetails(data);
      } catch (error) {
        console.error("Error fetching quiz details:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [quizId, userId, completedQuizId]);

  if (loading) {
    return <p>Laddar quizdetaljer...</p>;
  }

  if (error) {
    return <p>Error loading quiz details: {error}</p>;
  }

  if (!quizDetails || !quizDetails.questions) {
    return <p>Quizdetaljer kunde inte laddas. Kontrollera dina valda uppgifter.</p>;
  }

  const filteredQuestions = quizDetails.questions.filter((question) => {
    const userAnswerDetails = quizDetails.userAnswers.find(
      (ans) => ans.questionId === question.id
    );
    const userAnswer = userAnswerDetails?.userAnswer;

    if (filter === 'correct') {
      return userAnswer === question.correctAnswer;
    } else if (filter === 'incorrect') {
      return userAnswer !== question.correctAnswer;
    } else {
      return true; 
    }
  });

  return (
    <div className="teacher-view" style={{ backgroundImage: `url(${studentBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <MobileNavbar 
        links={[
          { label: 'Student Hörnan', path: '/StudentDashboard' },
          { label: 'Välj Din Quiz', path: '/WeeklyQuizSelection' },
          { label: 'Färdiga Quizzes', path: '/CompletedQuiz' },
          { label: 'Rank Mästare', path: '/Ranking' },
        ]}
        handleNavigation={handleNavigation} // Pass the handleNavigation function here
      />
      <div className="details-container">
        <SectionHeading
          mainIcon={qWhiteIcon}
          mainText="uiz"
          subText="Detaljer"
          subIcon={hand_lightbulb}
        />
        <p><strong>Quiz namn:</strong> {quizNames[quizDetails.quizId]}</p>
        <p><strong>Antal rätt svar:</strong> {quizDetails.score}/{quizDetails.totalQuestions}</p>

        <p><strong>Välj för att visa:</strong></p>
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

        <ol>
          {filteredQuestions.map((question, index) => {
            const userAnswerDetails = quizDetails.userAnswers.find(
              (ans) => ans.questionId === question.id
            );
            const userAnswer = userAnswerDetails?.userAnswer || "Ingen svar";

            return (
              <li key={index}>
                <p>{question.text}</p>
                <p><strong>Rätt svar:</strong> {question.correctAnswer}</p>
                <p><strong>Ditt svar:</strong> {userAnswer}</p>
                <p>
                  {userAnswer === question.correctAnswer
                    ? "✔️ Korrekt!"
                    : "❌ Fel."}
                </p>
              </li>
            );
          })}
        </ol>

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

export default QuizDetails;
