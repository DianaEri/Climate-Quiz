import React, { useEffect, useState } from 'react';
import { getQuizDetails } from '../firebaseHelpers'; // A helper function to fetch quiz details

function QuizDetails({ quizId, onBackToCompletedQuizzes }) {
    const [quizDetails, setQuizDetails] = useState(null);
  
    useEffect(() => {
      async function fetchDetails() {
        try {
          console.log("Fetching quiz details for quizId:", quizId); // Debugging log
          const data = await getQuizDetails(quizId); // Pass only quizId
          setQuizDetails(data);
        } catch (error) {
          console.error("Error fetching quiz details:", error.message);
        }
      }
      fetchDetails();
    }, [quizId]);
  
    if (!quizDetails) {
      return <p>Laddar quizdetaljer...</p>;
    }

  return (
    <div>
      <h1>Quizdetaljer</h1>
      <p>Quiz ID: {quizId}</p>
      <ul>
        {quizDetails.questions.map((question, index) => (
          <li key={index}>
            <p>{question.text}</p>
            <p>
              <strong>Rätt svar:</strong> {question.correctAnswer}
            </p>
            <p>
              <strong>Ditt svar:</strong> {question.userAnswer}
            </p>
          </li>
        ))}
      </ul>
      <button onClick={onBackToCompletedQuizzes}>Tillbaka till Avklarade Quiz</button>
    </div>
  );
}

export default QuizDetails;
