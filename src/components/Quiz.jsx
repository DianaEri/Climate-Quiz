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
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Shuffle utility
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    fetch("/quizData.json")
      .then((response) => response.json())
      .then((data) => {
        const processedData = data
          .filter((question) => question.quizId === quizId)
          .map((question) => ({
            ...question,
            all_answers: shuffle([
              question.correct_answer.trim(),
              ...question.incorrect_answers.map((ans) => ans.trim()),
            ]),
          }));
        setQuizData(processedData);
      });
  }, [quizId]);

  const handleAnswerSelect = (questionId, answer) => {
    if (typeof answer !== "string") {
      console.error(`Invalid answer type for question ${questionId}:`, answer);
      return;
    }
  
    console.log(`Question ID: ${questionId}, Selected Answer: ${answer}`); // Debugging log
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer.trim(), // Ensure answers are trimmed
    }));
  };  

  const handleNext = () => {
    const currentQuestion = quizData[currentIndex];
    const userAnswer = selectedAnswers[currentQuestion.id];
    const correctAnswer = currentQuestion.correct_answer.trim();

    if (userAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentIndex < quizData.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleCompleteQuiz = async () => {
    try {
      const userAnswers = quizData.map((question) => ({
        questionId: question.id,
        userAnswer: selectedAnswers[question.id] || null,
      }));
      await saveCompletedQuiz(userId, quizId, userAnswers);
      alert("Quiz saved as completed!");
      onBackToDashboard();
    } catch (error) {
      console.error("Error saving quiz:", error.message);
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
