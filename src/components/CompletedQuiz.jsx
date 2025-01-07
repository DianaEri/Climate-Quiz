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
      <h1>Completed Quizzes</h1>
      {/* Check if there are any completed quizzes */}
      {completedQuizzes.length === 0 ? (
        <p>No completed quizzes found.</p>
      ) : (
        <ul>
          {/* Loop through the completed quizzes and display them */}
          {completedQuizzes.map((quiz) => (
            <li key={quiz.completedQuizId}>
              <p>
                Quiz ID: {quiz.quizId} <br />
                Completed At: {new Date(quiz.completedAt).toLocaleString()} {/* Formatting completed date */}
              </p>
              {/* Button to view quiz details */}
              <button onClick={() => onViewQuizDetails(quiz.quizId, quiz.completedQuizId)}>
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onBackToDashboard}>Back to Dashboard</button>
    </div>
  );
};

export default CompletedQuiz;
