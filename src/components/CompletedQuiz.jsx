import React, { useEffect, useState } from 'react';
import { getCompletedQuizzes } from '../firebaseHelpers'; // Ensure this is correctly imported from your firebase helpers

const CompletedQuiz = ({ userId, onBackToDashboard, onViewQuizDetails }) => {
  const [completedQuizzes, setCompletedQuizzes] = useState([]);

  // Fetch completed quizzes from Firestore when the component mounts
  useEffect(() => {
    const fetchCompletedQuizzes = async () => {
      try {
        const quizzes = await getCompletedQuizzes(userId);
        setCompletedQuizzes(quizzes); // Store completed quizzes in state
      } catch (error) {
        console.error("Error fetching completed quizzes:", error);
      }
    };

    fetchCompletedQuizzes(); // Call function to fetch completed quizzes
  }, [userId]);

  return (
    <div>
      <h1>Färdiga Quiz</h1>
      {/* Check if there are any completed quizzes */}
      {completedQuizzes.length === 0 ? (
        <p>Du har inte gjort några Quiz än, börja nu för att få en rank bland mästarna.</p>
      ) : (
        <ul>
          {/* Loop through the completed quizzes and display them */}
          {completedQuizzes.map((quiz) => (
            <li key={quiz.completedQuizId}>
              <p>
                Quiz namn: {quiz.quizId} <br />
                Avklarad den: {new Date(quiz.completedAt).toLocaleString()} {/* Formatting completed date */}
              </p>
              {/* Button to view quiz details */}
              <button onClick={() => onViewQuizDetails(quiz.quizId, quiz.completedQuizId)}>
                Visa Detajer
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onBackToDashboard}>Tillbaka till Startsida</button>
    </div>
  );
};

export default CompletedQuiz;
