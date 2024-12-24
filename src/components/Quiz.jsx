import { useEffect, useState } from "react";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import Question from "./Question";
import QuizResult from "./QuizResult";
import PillButton from "./PillButton";
import QuizBackground from "./QuizBackground";

const Quiz = ({ onBackToDashboard }) => {
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Function to shuffle array elements
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Fetch quiz data
  useEffect(() => {
    fetch("/quizData.json")
      .then((response) => response.json())
      .then((data) => {
        const processedData = data.map((question) => ({
          ...question,
          all_answers: shuffle([question.correct_answer, ...question.incorrect_answers]),
        }));
        setQuizData(processedData);
      });
  }, []);

  // Handle next question
  const handleNext = () => {
    const selectedOption = document.querySelector(
      `input[name="question_${currentIndex}"]:checked`
    );

    if (selectedOption) {
      const userAnswer = selectedOption.value;
      const correctAnswer = quizData[currentIndex]?.correct_answer;

      if (userAnswer === correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }
    }

    if (currentIndex < quizData.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  return (
    <div style={{ height: "100vh", overflow: "hidden", position: "relative" }}>
      <QuizBackground currentQuestion={currentIndex} />
      <div
        className="quiz-content"
        style={{
          position: "relative",
          zIndex: 2,
          width: "80%",
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "20px",
          backgroundColor: "#0d171f",
          borderRadius: "15px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxSizing: "border-box",
        }}
      >
        {isQuizFinished ? (
          <QuizResult
            score={score}
            totalQuestions={quizData.length}
            onBackToDashboard={onBackToDashboard}
          />
        ) : (
          <>
            {quizData.length > 0 && (
              <Question
                key={currentIndex}
                data={quizData[currentIndex]}
                index={currentIndex}
                numberOfQuestion={quizData.length}
                progress={((currentIndex + 1) / quizData.length) * 100}
              />
            )}
            <div className="button-container">
              <PillButton
                text={
                  currentIndex < quizData.length - 1
                    ? "Nästa fråga"
                    : "Skicka in"
                }
                icon={faCircleRight}
                onClick={handleNext}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
