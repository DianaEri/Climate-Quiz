import React from 'react';

const WeeklyQuizSelection = ({ onSelectQuiz, onBackToDashboard }) => {
  return (
    <div>
      <h1>Veckans Quiz</h1>
      <p>Välj en quiz att starta:</p>
      <div>
        <button onClick={() => onSelectQuiz('quiz1')}>Quiz 1</button>
        <button onClick={() => onSelectQuiz('quiz2')}>Quiz 2</button>
        <button onClick={() => onSelectQuiz('quiz3')}>Quiz 3</button>
        <button onClick={() => onSelectQuiz('quiz4')}>Quiz 4</button>
      </div>
      <button onClick={onBackToDashboard}>Tillbaka till Dashboard</button>
    </div>
  );
};

export default WeeklyQuizSelection;
