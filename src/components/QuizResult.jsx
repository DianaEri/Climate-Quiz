import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";
import PillButton from "./PillButton";
import heart from "../assets/heart.svg";
import bWhiteIcon from "../assets/b_white.svg";
import SectionHeading from "./SectionHeading";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const QuizResult = ({
  score,
  totalQuestions,
  quizData,
  selectedAnswers,
  onBackToDashboard,
  onCompleteQuiz,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const results = quizData.map((question) => {
    const userAnswer = selectedAnswers[question.id] || "Ingen svar";
    const correctAnswer = question.correct_answer.trim();
    const isCorrect =
      userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();

    return { questionId: question.id, userAnswer, correctAnswer, isCorrect };
  });

  const correctAnswers = results.filter((res) => res.isCorrect).length;
  const incorrectAnswers = totalQuestions - correctAnswers;

  const pieData = {
    labels: ["Fel", "Rätt"],
    datasets: [
      {
        label: "Resultat",
        data: [incorrectAnswers, correctAnswers],
        backgroundColor: ["#E7625F", "#ADC290"],
        borderColor: "transparent",
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "white", font: { weight: "bold" } },
      },
    },
  };

  const handleCompleteQuiz = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
  
    // Send the results, correct answers count, and total questions to Firestore
    onCompleteQuiz(results, correctAnswers, totalQuestions);
  };

  // Determine the motivational message
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
      {getMotivationalMessage()}
      <div
        className="chart-container"
        style={{ width: "250px", height: "250px", margin: "0 auto" }}
      >
        <Pie data={pieData} options={pieOptions} />
      </div>

      <div className="view-answers-link-container">
        <p className="view-answers-link">
          Se alla <a href="#" className="answer-link">dina svar</a> med rätta
          lösningar.
        </p>
      </div>

      <div className="button-container">
        <PillButton
          text={isSubmitting ? "Skickar..." : "Skicka in Quiz"}
          icon={faCircleRight}
          onClick={handleCompleteQuiz}
          disabled={isSubmitting}
        />
      </div>
      <div className="button-container">
        <PillButton
          text="Tillbaka till Startsida"
          icon={faCircleLeft}
          onClick={onBackToDashboard}
        />
      </div>
    </div>
  );
};

export default QuizResult;
