import React, { useEffect, useState } from 'react';
import { getCompletedQuizzes } from '../firebaseHelpers';

function CompletedQuizzes({ userId, onBackToDashboard }) {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    async function fetchQuizzes() {
      const data = await getCompletedQuizzes(userId);
      setQuizzes(data);
    }
    fetchQuizzes();
  }, [userId]);

  return (
    <div>
      <h1>Completed Quizzes</h1>
      {quizzes.length > 0 ? (
        <ul>
          {quizzes.map((quiz, index) => (
            <li key={index}>
              Quiz ID: {quiz.quizId} - Completed At: {quiz.completedAt}
            </li>
          ))}
        </ul>
      ) : (
        <p>No completed quizzes yet.</p>
      )}
      <button onClick={onBackToDashboard}>Back to Dashboard</button> {/* Go back */}
    </div>
  );
}

export default CompletedQuizzes;
