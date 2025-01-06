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
  score = 0,
  totalQuestions = 0,
  quizData = [],
  selectedAnswers = {},
  onBackToDashboard,
  onCompleteQuiz,
}) => {
  // Add the missing isSubmitting state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate detailed results
  const results = quizData.map((question) => {
    const userAnswer = selectedAnswers[question.id] || "Ingen svar";
    const correctAnswer = question.correct_answer.trim();
    const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
  
    console.log(
      `Question ID: ${question.id}, User Answer: ${userAnswer}, Correct Answer: ${correctAnswer}, Is Correct: ${isCorrect}`
    );
  
    return {
      questionId: question.id,
      questionText: question.question,
      userAnswer,
      correctAnswer,
      isCorrect,
    };
  });
  
  const correctAnswers = results.filter((result) => result.isCorrect).length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  
  console.log("Correct Answers:", correctAnswers); // Debugging log
  console.log("Incorrect Answers:", incorrectAnswers); // Debugging log

  const correctPercentage =
    totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  const incorrectPercentage =
    totalQuestions > 0 ? (incorrectAnswers / totalQuestions) * 100 : 0;

  console.log("Correct Answers:", correctAnswers);
  console.log("Incorrect Answers:", incorrectAnswers);
  console.log("Correct Percentage:", correctPercentage);
  console.log("Incorrect Percentage:", incorrectPercentage);

  // Updated pieData using percentages
  const pieData = {
    labels: ["Fel", "Rätt"],
    datasets: [
      {
        label: "Resultat",
        data: [incorrectAnswers, correctAnswers], // Correctly reflect results
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

    console.log("Submitting quiz results:", results);
    onCompleteQuiz(results);
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
        jobb! Du har fått {correctAnswers} rätt av {totalQuestions} möjliga.
      </p>

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
