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
  const [isQuizSaved, setIsQuizSaved] = useState(false);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("/quizData.json"); // Single JSON file
        const allQuestions = await response.json();
  
        // Filter questions by quizId
        const filteredQuestions = allQuestions.filter(
          (question) => question.quizId === quizId
        );
  
        if (filteredQuestions.length === 0) {
          console.error(`No questions found for quizId: ${quizId}`);
          return;
        }
  
        // Shuffle answers for each question
        const processedData = filteredQuestions.map((question) => ({
          ...question,
          all_answers: shuffle([
            question.correct_answer.trim(),
            ...question.incorrect_answers.map((ans) => ans.trim()),
          ]),
        }));
  
        setQuizData(processedData);
      } catch (error) {
        console.error("Error fetching quiz data:", error.message);
      }
    };
  
    fetchQuizData();
  }, [quizId]);
  

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer.trim(),
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
      // Calculate the user answers
      const userAnswers = quizData.map((question) => ({
        questionId: question.id,
        userAnswer: selectedAnswers[question.id] || null,
      }));
  
      // Calculate the number of correct answers
      const correctAnswers = quizData.filter((question) => {
        const userAnswer = selectedAnswers[question.id] || null;
        return userAnswer === question.correct_answer.trim(); // Compare the answer
      }).length;
  
      const totalQuestions = quizData.length;
  
      // Save the quiz with score and total questions
      const completedQuizId = await saveCompletedQuiz(
        userId,
        quizId,
        userAnswers,
        correctAnswers, // Pass correct answers
        totalQuestions  // Pass total questions
      );
  
      console.log("Completed quiz saved with ID:", completedQuizId);
      alert("Quiz saved as completed!");
      onBackToDashboard();
    } catch (error) {
      console.error("Error saving quiz:", error.message);
      alert("Failed to save the quiz. Please try again.");
    }
  };

  return (
    <div
      className="quiz-background"
      style={{ height: "100vh", overflow: "hidden", position: "relative" }}
    >
      <QuizBackground currentQuestion={currentIndex} />
      <div className="quiz-content">
        {isQuizFinished ? (
          <QuizResult
            score={score}
            totalQuestions={quizData.length}
            quizData={quizData}
            selectedAnswers={selectedAnswers}
            onCompleteQuiz={handleCompleteQuiz}
            onBackToDashboard={() => {
              if (isQuizSaved) {
                onBackToDashboard();
              } else {
                alert("Please save the quiz before exiting.");
              }
            }}
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
                onSelectAnswer={(answer) =>
                  handleAnswerSelect(quizData[currentIndex].id, answer)
                }
              />
            )}
            <div className="button-container">
              <PillButton
                text={
                  currentIndex < quizData.length - 1
                    ? "Nästa fråga"
                    : "Visa resultat"
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
