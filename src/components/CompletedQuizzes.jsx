import React, { useEffect, useState } from 'react';
import { getCompletedQuizzes } from '../firebase/firebaseHelpers';

function CompletedQuizzes({ userId }) {
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
      <ul>
        {quizzes.map((quiz, index) => (
          <li key={index}>
            Quiz ID: {quiz.quizId} - Completed At: {quiz.completedAt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompletedQuizzes;
