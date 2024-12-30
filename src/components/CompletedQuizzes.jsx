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
      <h1>Avklarade Quiz</h1>
      {quizzes.length > 0 ? (
        <ul>
          {quizzes.map((quiz, index) => (
            <li key={index}>
              Quiz ID: {quiz.quizId} - Avklarad den: {quiz.completedAt}
            </li>
          ))}
        </ul>
      ) : (
        <p>Du har inte gjort några Quiz än, börja nu för att få en rank bland mästarna.</p>
      )}
      <button onClick={onBackToDashboard}>Tillbaka till Dashboard</button> {/* Go back */}
    </div>
  );
}

export default CompletedQuizzes;
