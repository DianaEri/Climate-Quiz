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

  // Shuffle answers function
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    fetch("/quizData.json")
      .then((response) => response.json())
      .then((data) => {
        // Combine correct and incorrect answers and shuffle them
        data.forEach((p) => {
          p.all_answers = shuffle([p.correct_answer, ...p.incorrect_answers]);
        });
        setQuizData(data);
      });
  }, []);

  const handleNext = () => {
    const selectedOption = document.querySelector(
      `input[name="question_${currentIndex}"]:checked`
    );
    if (selectedOption) {
      const userAnswer = selectedOption.value;
      const correctAnswer = quizData[currentIndex].correct_answer;

      if (userAnswer === correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }
    }

    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  return (
    <QuizBackground currentQuestion={currentIndex}>
      <div className="quiz-content">
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
    </QuizBackground>
  );
};

export default Quiz;
