import React, { useEffect, useState } from 'react';
import { getQuizDetails } from '../firebaseHelpers';

function QuizDetails({ userId, quizId, completedQuizId, onBackToCompletedQuizzes }) {
  const [quizDetails, setQuizDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await getQuizDetails(quizId, userId, completedQuizId);
        console.log("Fetched quiz details:", data);
        setQuizDetails(data);
      } catch (error) {
        console.error("Error fetching quiz details:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [quizId, userId, completedQuizId]);

  if (loading) {
    return <p>Laddar quizdetaljer...</p>;
  }

  if (!quizDetails || !quizDetails.userAnswers || !Array.isArray(quizDetails.userAnswers)) {
    return <p>Inga användarsvar tillgängliga för detta quiz.</p>;
  }

  return (
    <div>
      <h1>Quizdetaljer</h1>
      <p>Quiz ID: {quizId}</p>
      <ul>
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
      </ul>
      <button onClick={onBackToCompletedQuizzes}>Tillbaka till Avklarade Quiz</button>
    </div>
  );
}

export default QuizDetails;
