import React, { useEffect, useState } from 'react';
import { getQuizDetails } from '../firebaseHelpers'; // A helper function to fetch quiz details

function QuizDetails({ userId, quizId, onBackToCompletedQuizzes }) {
    const [quizDetails, setQuizDetails] = useState(null);
  
    useEffect(() => {
      async function fetchDetails() {
        const data = await getQuizDetails(quizId);
        setQuizDetails(data);
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
              <p><strong>Rätt svar:</strong> {question.correctAnswer}</p>
              <p>
                <strong>Ditt svar:</strong> 
                {quizDetails.userAnswers?.find(ans => ans.questionId === question.id)?.userAnswer || "Ingen svar"}
              </p>
            </li>
          ))}
        </ul>
        <button onClick={onBackToCompletedQuizzes}>Tillbaka till Avklarade Quiz</button>
      </div>
    );
  }  

export default QuizDetails;
