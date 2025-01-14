import { useState } from "react";
import { Pie } from "react-chartjs-2"; // Importerar Pie-diagram från react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Importerar de nödvändiga delarna från chart.js
import { faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons"; // Importerar ikoner för att gå till föregående eller nästa
import PillButton from "./PillButton"; // Importerar PillButton-komponenten för knappar
import heart from "../assets/heart.svg"; // Importerar ikon för motivation
import bWhiteIcon from "../assets/b_white.svg"; // Importerar ikon för sektion
import SectionHeading from "./SectionHeading"; // Importerar komponent för rubrik

// Registrera Chart.js-komponenter
ChartJS.register(ArcElement, Tooltip, Legend);

const QuizResult = ({
  score,
  totalQuestions,
  quizData,
  selectedAnswers,
  onBackToDashboard,
  onCompleteQuiz,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Håller koll på om quizresultaten skickas

  // Beräkna resultatet för varje fråga
  const results = quizData.map((question) => {
    const userAnswer = selectedAnswers[question.id] || "Ingen svar"; // Hämta användarens svar eller sätt "Ingen svar"
    const correctAnswer = question.correct_answer.trim(); // Trimma rätt svar
    const isCorrect =
      userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase(); // Jämför om användarens svar är korrekt

    return { questionId: question.id, userAnswer, correctAnswer, isCorrect }; // Returnera objekt med resultat
  });

  const correctAnswers = results.filter((res) => res.isCorrect).length; // Beräkna antalet korrekta svar
  const incorrectAnswers = totalQuestions - correctAnswers; // Beräkna antalet felaktiga svar
  const percentage = Math.round((correctAnswers / totalQuestions) * 100); // Beräkna procentandel korrekta svar

  // Data för pie-diagrammet
  const pieData = {
    labels: ["Fel", "Rätt"], // Etiketter för diagrammet
    datasets: [
      {
        label: "Resultat",
        data: [incorrectAnswers, correctAnswers], // Data för diagrammet (felaktiga vs. korrekta svar)
        backgroundColor: ["#fb879e", "#2a9d8f"], // Färger för felen och de korrekta svaren
        borderColor: "transparent", // Ingen kantfärg
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  // Inställningar för pie-diagrammet
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "white", font: { weight: "bold" } }, // Förändrar färg och fontstil för legendetiketterna
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const total = tooltipItem.dataset.data.reduce((acc, curr) => acc + curr, 0); // Calculate total value
            const percentage = ((tooltipItem.raw / total) * 100).toFixed(2); // Calculate the percentage
            return percentage + "%"; // Show percentage in the tooltip
          },
        },
      },
    },
  };

  // Funktion för att skicka in quizresultaten
  const handleCompleteQuiz = () => {
    if (isSubmitting) return; // Om resultaten redan skickas, gör inget
    setIsSubmitting(true);

    // Skicka resultatet, antal korrekta svar och totalt antal frågor till Firestore
    onCompleteQuiz(results, correctAnswers, totalQuestions);
  };

  // Bestäm motivationstext baserat på resultat
  const getMotivationalMessage = () => {
    if (correctAnswers === totalQuestions) {
      return (
        <p className="motivating-message-quiz-result">
          Wow, full pott! Fantastiskt jobbat, du är en riktig stjärna! Du har fått {correctAnswers} rätt av {totalQuestions} möjliga.
        </p>
      );
    } else if (correctAnswers >= 9) {
      return (
        <p className="motivating-message-quiz-result">
          Bra jobbat! Du är på rätt väg, fortsätt så här! Du har fått {correctAnswers} rätt av {totalQuestions} möjliga.
        </p>
      );
    } else if (correctAnswers >= 4) {
      return (
        <p className="motivating-message-quiz-result">
          Du har fått några rätt! Bra jobbat, men du kan definitivt göra bättre! Du har fått {correctAnswers} rätt av {totalQuestions} möjliga.
        </p>
      );
    } else {
      return (
        <p className="motivating-message-quiz-result">
          Det var nära! Du kan bättre, ge det ett nytt försök och visa vad du går för! Du har fått {correctAnswers} rätt av {totalQuestions} möjliga.
        </p>
      );
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
      {getMotivationalMessage()} {/* Visar motivationstext */}
      <div className="chart-container">
        <Pie data={pieData} options={pieOptions} /> {/* Visar pie-diagrammet */}

        {/* Centrera procentetiketten */}
        <div className="percentage-label">
          {percentage}%
        </div>
      </div>

      <div className="button-container">
        <PillButton
          text={isSubmitting ? "Skickar..." : "Skicka in Quiz"} // Om quizresultatet skickas, visa "Skickar..."
          icon={faCircleRight}
          onClick={handleCompleteQuiz}
          disabled={isSubmitting} // Disable knappen om resultaten redan skickas
        />
      </div>
      <div className="button-container">
        <PillButton
          text="Tillbaka till Startsida" // Text för att gå tillbaka till startsidan
          icon={faCircleLeft}
          onClick={onBackToDashboard} // Anropar onBackToDashboard för att gå tillbaka
        />
      </div>
    </div>
  );
};

export default QuizResult; // Exporterar QuizResult-komponenten
