import React, { useEffect, useState } from 'react';

function CompletedQuizzes({ userId }) {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const completedQuizzes = await getCompletedQuizzes(userId);
      setQuizzes(completedQuizzes);
    }
    fetchData();
  }, [userId]);

  return (
    <div>
      <h1>Färdiga quiz</h1>
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
    </div>
  );
}

export default CompletedQuizzes;
