import { useEffect, useState } from "react";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import Question from "./Question";
import QuizResult from "./QuizResult";
import PillButton from "./PillButton";
import QuizBackground from "./QuizBackground";
import { saveCompletedQuiz } from "../firebaseHelpers";

const Quiz = ({ onBackToDashboard, userId, quizId }) => {
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track user's selected answers

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer, // Update the answer for the specific question
    }));
  };

  const handleCompleteQuiz = async () => {
    try {
      console.log("Saving quiz with userId:", userId, "and quizId:", quizId);
      const userAnswers = quizData.map((question) => ({
        questionId: question.id,
        userAnswer: selectedAnswers[question.id] || null,
      }));
      await saveCompletedQuiz(userId, quizId, userAnswers); // Save quiz with answers
      alert("Quiz saved as completed!");
      onBackToDashboard();
    } catch (error) {
      console.error("Error saving quiz:", error.message);
    }
  };

  useEffect(() => {
    fetch("/quizData.json")
      .then((response) => response.json())
      .then((data) => {
        const processedData = data
          .filter((question) => question.quizId === quizId) // Filter by quizId
          .map((question) => ({
            ...question,
            all_answers: shuffle([question.correct_answer, ...question.incorrect_answers]),
          }));
        setQuizData(processedData);
      });
  }, [quizId]);

  const handleNext = () => {
    const currentQuestion = quizData[currentIndex];
    if (selectedAnswers[currentQuestion.id] === currentQuestion.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  return (
    <div className="quiz-background" style={{ height: "100vh", overflow: "hidden", position: "relative" }}>
      <QuizBackground currentQuestion={currentIndex} />
      <div className="quiz-content">
        {isQuizFinished ? (
          <QuizResult
            score={score}
            totalQuestions={quizData.length}
            quizData={quizData}
            selectedAnswers={selectedAnswers}
            onCompleteQuiz={handleCompleteQuiz}
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
                onSelectAnswer={(answer) => handleAnswerSelect(quizData[currentIndex].id, answer)}
              />
            )}
            <div className="button-container">
              <PillButton
                text={currentIndex < quizData.length - 1 ? "Nästa fråga" : "Skicka in"}
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
