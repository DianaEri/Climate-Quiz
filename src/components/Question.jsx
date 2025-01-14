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

// Registrera de nödvändiga modulerna för diagrammet i ChartJS
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

  // Kontrollera om ingen data finns och visa ett meddelande
  if (!data) return <p>Ingen data finns</p>;

  const currentQuestion = data;

  // Om frågans id är 13, ändra färgen på dataset beroende på etiketten
  if (currentQuestion.id === 13 && currentQuestion.chart_data?.datasets) {
    currentQuestion.chart_data.datasets = currentQuestion.chart_data.datasets.map(dataset => {
      if (dataset.label === "GISTEMP (°C)") {
        return {
          ...dataset,
          backgroundColor: "#EF813E", // Sätt bakgrundsfärg för GISTEMP
          borderColor: "#EF813E" // Sätt gränsfärg för GISTEMP
        };
      } else if (dataset.label === "GCAG (°C)") {
        return {
          ...dataset,
          backgroundColor: "#E6B451", // Sätt bakgrundsfärg för GCAG
          borderColor: "#E6B451" // Sätt gränsfärg för GCAG
        };
      }
      return dataset; // Om ingen etikett matchar, behåll dataset som det är
    });
  }

  // Funktion för att hantera när ett svar ändras
  const handleAnswerChange = (e) => {
    props.onSelectAnswer(currentQuestion.id, e.target.value); // Meddelar föräldern om det valda svaret
  };

  return (
    <div className="question-card">
      <div className="question-body">
        {/* Progress Bar med procent */}
        <div className="progress-bar-container">
          <progress className="progress-bar" value={props.progress} max="100"></progress>
          <div className="progress-text">{Math.round(props.progress)}%</div> {/* Visar procent */}
        </div>

        {/* Rendera diagram endast om chart_data finns */}
        {currentQuestion.chart_data?.datasets && (
        <div className="chart-container">
          <Bar 
            data={{
              labels: currentQuestion.chart_data.labels, // Diagrammets etiketter
              datasets: currentQuestion.chart_data.datasets // Dataset för diagrammet
            }} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  beginAtZero: true, // Börja från 0 på x-axeln
                  grid: { display: false }, // Döljer rutnät på x-axeln
                  ticks: {
                    color: 'white', // Sätt färgen på x-axelns etiketter
                    font: { weight: 'bold' } // Sätt fetstil på x-axelns etiketter
                  }
                },
                y: {
                  beginAtZero: true, // Börja från 0 på y-axeln
                  grid: { display: false }, // Döljer rutnät på y-axeln
                  ticks: {
                    color: 'white', // Sätt färgen på y-axelns etiketter
                    font: { weight: 'bold' } // Sätt fetstil på y-axelns etiketter
                  }
                }
              },
              plugins: {
                legend: {
                  labels: {
                    font: { weight: 'bold' }, // Sätt fetstil på legendens etiketter
                    color: 'white' // Sätt färgen på legendens etiketter
                  }
                }
              }
            }}
            aria-label="Bar chart showing quiz results" // Lägg till aria-label för diagrammet
          />
        </div>
      )}

        {/* Frågeinformation */}
        <div className="question-container">
        <div className="question-info" aria-live="polite">
          Fråga {props.index + 1} / {props.numberOfQuestion} {/* Visar nuvarande fråga och total antal frågor */}
        </div>
          <h5 className="question-title">{currentQuestion.question}</h5> {/* Visar själva frågan */}
        </div>

        {currentQuestion.all_answers.map((answer, index) => (
          <div className="answer-button" key={index}>
            <label className="option-button" htmlFor={`radio_${props.index}_${index}`}>
              <span className="radio-label">{answer}</span> {/* Visa svarsalternativet */}
              <input
                className="radio-button"
                type="radio"
                name={`question_${props.index}`}
                id={`radio_${props.index}_${index}`}
                value={String(answer)} // Se till att värdet är en sträng
                onChange={(e) => props.onSelectAnswer(e.target.value)} // Skicka det valda svaret till onSelectAnswer
                aria-label={`Svar alternativ: ${answer}`} // Lägg till aria-label
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
