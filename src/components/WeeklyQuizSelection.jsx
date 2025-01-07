import React, { useEffect, useState } from "react";

const WeeklyQuizSelection = ({ onSelectQuiz, onBackToDashboard }) => {
  const [quizData, setQuizData] = useState([]);
  const [uniqueQuizzes, setUniqueQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("/quizData.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch quiz data: ${response.statusText}`);
        }
        const data = await response.json();

        // Extract unique quizzes by `quizId`
        const uniqueQuizIds = Array.from(new Set(data.map((quiz) => quiz.quizId)));
        const uniqueQuizObjects = uniqueQuizIds.map((id) => ({
          quizId: id,
          name: `Quiz ${id.replace("quiz", "")}`, // Optionally format names
        }));
        setQuizData(data);
        setUniqueQuizzes(uniqueQuizObjects);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, []);

  return (
    <div>
      <h1>Veckans Quiz</h1>
      <p>Välj en quiz att starta:</p>
      <div>
        {uniqueQuizzes.map((quiz) => (
          <button onClick={() => onViewQuizDetails(quiz.quizId, quiz.completedQuizId)}>
            {quiz.name}
          </button>
        ))}
      </div>
      <button onClick={onBackToDashboard}>Tillbaka till Dashboard</button>
    </div>
  );
};

export default WeeklyQuizSelection;
