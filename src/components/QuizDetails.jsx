import React, { useEffect, useState } from 'react';
import { getQuizDetails } from '../firebaseHelpers';
import studentBackground from '../assets/student_bg.svg';
import MobileNavbar from './MobileNavbar';
import PillButton from './PillButton';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'; 
import SectionHeading from './SectionHeading';
import hand_lightbulb from '../assets/hand_lightbulb.svg';
import qWhiteIcon from '../assets/q_white.svg';

function QuizDetails({ userId, quizId, completedQuizId, onBackToCompletedQuizzes }) {
  const [quizDetails, setQuizDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add an error state for better error handling

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await getQuizDetails(quizId, userId, completedQuizId);
        console.log("Fetched quiz details:", data);
        setQuizDetails(data);
      } catch (error) {
        console.error("Error fetching quiz details:", error.message);
        setError(error.message); // Set the error message
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

  return (
    <div       
      className="teacher-view"
      style={{
        backgroundImage: `url(${studentBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <MobileNavbar />
      <div className="finishedquiz-container">
      <SectionHeading
          mainIcon={qWhiteIcon}
          mainText="uiz"
          subText="Detaljer"
          subIcon={hand_lightbulb}
        />
      <p><strong>Quiz namn:</strong> {quizDetails.quizId}</p>
      <p><strong>Antal rätt svar:</strong> {quizDetails.score}/{quizDetails.totalQuestions}</p>
      <ol>
        {quizDetails.questions.map((question, index) => {
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
      {/* Center the PillButton */}
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
