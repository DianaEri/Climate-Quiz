import React from 'react';
import { Pie } from 'react-chartjs-2'; 
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';
import achievementSmiley from './achievement_smiley.svg'; 

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const QuizResult = ({ score, totalQuestions }) => {
  const incorrectAnswers = totalQuestions - score;

  // Data for the Pie Chart
  const pieData = {
    labels: ['Fel', 'Rätt'],
    datasets: [{
      label: 'Resultat',
      data: [incorrectAnswers, score],
      backgroundColor: ['#E7625F', '#ADC290'],
      borderColor: 'transparent', 
      borderWidth: 0,             
      hoverOffset: 4
    }]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'black',
          font: {
            weight: 'bold'
          }
        }
      }
    }
  };

  return (
    <div className="quiz-result-container">
      <p className='motivating-message-quiz'>Bra jobbat med att slutföra quizen!</p>

      {/* achievement smiley image */}
      <img className='achievement-image'
        src={achievementSmiley}
        alt="Achievement Smiley"
        style={{ display: 'block', margin: '0 auto', width: '100px' }}
      />

      <p className='motivating-message-quiz-result'>
        Fortsätt det fantastiska arbetet och lärandet – du gör ett riktigt bra jobb!
        Du har fått {score} rätt av {totalQuestions} möjliga.
      </p>
      
      {/* Pie Chart to display the percentage of correct and incorrect answers */}
      <div 
        className="chart-container" 
        style={{ width: '300px', height: '300px', margin: '0 auto' }}
      >
        <Pie data={pieData} options={pieOptions} />
      </div>

      {/* Link to view all answers with correct solutions */}
      <div className='view-answes-link-container'>
      <p className="view-answers-link">
        Se alla <a href="#" className="answer-link">dina svar</a> med rätta lösningar.
      </p>
      </div>

      {/* Button to go back to the start page */}
      <div className="button-container">
        <button className="next-button">
         Tillbaka till startsidan <FontAwesomeIcon icon={faCircleUp} className="button-icon" />
        </button>
      </div>
    </div>
  );
};

export default QuizResult;