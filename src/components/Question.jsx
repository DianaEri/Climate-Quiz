import { Bar } from 'react-chartjs-2'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Question = (props) => {
  const data = props.data;

  if (data === undefined) return <p>There is no data</p>;

  const currentQuestion = data;

  
 
  if (currentQuestion.id === 13 && currentQuestion.chart_data?.datasets) {
    currentQuestion.chart_data.datasets = currentQuestion.chart_data.datasets.map(dataset => {
      if (dataset.label === "GISTEMP (°C)") {
        return {
          ...dataset,
          backgroundColor: "#EF813E",
          borderColor: "#EF813E"
        }
      } else if (dataset.label === "GCAG (°C)") {
        return {
          ...dataset,
          backgroundColor: "#E6B451",
          borderColor: "#E6B451"
        }
      }
      return dataset;
    });
  }

  return (
    <div className="question-card">
      <div className="question-body">

        {/* Progress Bar with Percentage */}
        <div className="progress-bar-container">
          <progress className="progress-bar" value={props.progress} max="100"></progress>
          <div className="progress-text">{Math.round(props.progress)}%</div> 
        </div>

        {/* Render Chart only if chart_data exists */}
        {currentQuestion.chart_data?.datasets && (
          <div className="chart-container">
            <Bar 
              data={{
                labels: currentQuestion.chart_data.labels,
                datasets: currentQuestion.chart_data.datasets
              }} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    beginAtZero: true,
                    grid: {
                      display: false 
                    },
                    ticks: {
                      color: 'black',
                      font: {
                        weight: 'bold'
                      }
                    }
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      display: false 
                    },
                    ticks: {
                      color: 'black',
                      font: {
                        weight: 'bold'
                      }
                    }
                  }
                },
                plugins: {
                  legend: {
                    labels: {
                      font: {
                        weight: 'bold'
                      },
                      color: 'black'
                    }
                  }
                }
              }} 
            />
          </div>
        )}

        {/* Question Info */}

        <div className='question-container'>
        <div className="question-info">Fråga {props.index + 1} / {props.numberOfQuestion}</div>

        <h5 className="question-title">{currentQuestion.question}</h5>
        </div>
        {currentQuestion.all_answers.map((answer, index) => (
        <div className='answer-button' key={index}> {/* Add the key here */}
          <label className="option-button" htmlFor={`radio_${props.index}_${index}`}>
            <span className="radio-label">{answer}</span>
            <input
              className="radio-button"
              type="radio"
              name={`question_${props.index}`}
              id={`radio_${props.index}_${index}`}
              value={answer}
            />
          </label>
        </div>
      ))}

      </div>
    </div>
  );
};

export default Question;