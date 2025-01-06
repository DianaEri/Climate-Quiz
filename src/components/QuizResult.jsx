import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
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

  // Correct and Incorrect Answers Calculation
  const results = quizData.map((question, index) => {
    const userAnswer = selectedAnswers[question.id] || null;
    const isCorrect =
      userAnswer?.trim().toLowerCase() ===
      question.correct_answer?.trim().toLowerCase();

    return { questionId: question.id, isCorrect, userAnswer };
  });

  const incorrectAnswers = results.filter((result) => !result.isCorrect).length;

  const pieData = {
    labels: ["Fel", "Rätt"],
    datasets: [
      {
        label: "Resultat",
        data: [incorrectAnswers, score],
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
        labels: {
          color: "white",
          font: {
            weight: "bold",
          },
        },
      },
    },
  };

  const handleCompleteQuiz = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const userAnswers = results.map(({ questionId, userAnswer }) => ({
      questionId,
      userAnswer,
    }));

    onCompleteQuiz(userAnswers);
  };

  return (
    <div className="quiz-result-container">
      <SectionHeading
        mainIcon={bWhiteIcon}
        mainText="ra"
        subText="Jobbat"
        subIcon={heart}
      />

      <p className="motivating-message-quiz-result">
        Fortsätt det fantastiska arbetet och lärandet – du gör ett riktigt bra
        jobb! Du har fått {score} rätt av {totalQuestions} möjliga.
      </p>

      {/* Pie Chart */}
      <div
        className="chart-container"
        style={{ width: "300px", height: "300px", margin: "0 auto" }}
      >
        <Pie data={pieData} options={pieOptions} />
      </div>

      {/* View All Answers */}
      <div className="view-answers-link-container">
        <p className="view-answers-link">
          Se alla <a href="#" className="answer-link">dina svar</a> med rätta
          lösningar.
        </p>
      </div>

      {/* Submit Quiz */}
      <div className="button-container">
        <PillButton
          text={isSubmitting ? "Skickar..." : "Skicka in Quiz"}
          icon={faCircleRight}
          onClick={handleCompleteQuiz}
          disabled={isSubmitting}
        />
      </div>

      {/* Back to Dashboard */}
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
