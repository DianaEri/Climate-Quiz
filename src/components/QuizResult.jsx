import React from 'react';
import { Pie } from 'react-chartjs-2'; 
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'; 
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'; // Import the left arrow icon
import PillButton from './PillButton'; // Import PillButton
import heart from '../assets/heart.svg';
import bWhiteIcon from '../assets/b_white.svg';
import SectionHeading from './SectionHeading';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const QuizResult = ({ score, totalQuestions, onBackToDashboard }) => { // Add onBackToDashboard prop
  const incorrectAnswers = totalQuestions - score;

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
          color: 'white',
          font: {
            weight: 'bold'
          }
        }
      }
    }
  };

  return (
    <div className="quiz-result-container">
      <SectionHeading
        mainIcon={bWhiteIcon}
        mainText="ra"
        subText="Jobbat"
        subIcon={heart}
      />

      <p className='motivating-message-quiz-result'>
        Fortsätt det fantastiska arbetet och lärandet – du gör ett riktigt bra jobb!
        Du har fått {score} rätt av {totalQuestions} möjliga.
      </p>

      {/* Pie Chart to display the percentage of correct and incorrect answers */}
      <div className="chart-container" style={{ width: '250px', height: '250px', margin: '0 auto' }}>
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
        <PillButton
          text="Tillbaka till Startsida"
          icon={faCircleLeft}
          onClick={onBackToDashboard} // Call the prop function
        />
      </div>
    </div>
  );
};

export default QuizResult;
