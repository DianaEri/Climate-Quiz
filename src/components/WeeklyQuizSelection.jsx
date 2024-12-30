import React from "react";

const WeeklyQuizSelection = ({ onSelectQuiz, onBackToDashboard }) => {
  return (
    <div>
      <h1>Veckans Quiz</h1>
      <p>Välj en quiz att starta:</p>
      <div>
        <button onClick={() => onSelectQuiz("quiz1")}>Quiz 1</button>
        <button disabled>Quiz 2 (Kommer snart)</button>
        <button disabled>Quiz 3 (Kommer snart)</button>
        <button disabled>Quiz 4 (Kommer snart)</button>
      </div>
      <button onClick={onBackToDashboard}>Tillbaka till Dashboard</button>
    </div>
  );
};

export default WeeklyQuizSelection;
