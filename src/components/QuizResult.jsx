import React, { useEffect, useState } from 'react';
import { getCompletedQuizzes } from '../firebaseHelpers'; // Make sure this is imported correctly

const CompletedQuiz = ({ userId, onBackToDashboard, onViewQuizDetails }) => {
  const [completedQuizzes, setCompletedQuizzes] = useState([]);

  // Map quizId to actual quiz names
  const quizNames = {
    quiz1: "Klimatkaos: Vad Vet Du Om Världens Förändring?",
    quiz2: "Havet Uteblir: Kan Du Rädda Stränderna?",
    quiz3: "Isjakt: Hur Mycket Vet Du Om Glaciärer?",
    quiz4: "CO2-Utmaningen: Vad Kan Du Om Fossila Bränslen?"
  };

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
              {/* Display quiz name and completion date outside the button */}
              <p>
                <strong>Quiz namn:</strong> {quizNames[quiz.quizId]} {/* Display the quiz name */}
              </p>
              <p>
                <strong>Avklarad den:</strong> {new Date(quiz.completedAt).toLocaleString()} {/* Display the date */}
              </p>
              <p>
                <strong>Antal rätt svar:</strong> {quiz.score}/{quiz.totalQuestions} {/* Display correct answers */}
              </p>

              {/* Button to view quiz details */}
              <button 
                onClick={() => onViewQuizDetails(quiz.quizId, quiz.completedQuizId)} 
                className="quiz-details-button"
              >
                Visa Detaljer
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
