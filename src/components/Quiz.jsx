import { useEffect, useState } from "react";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import Question from "./Question"; // Importerar komponenten för att visa frågorna
import QuizResult from "./QuizResult"; // Importerar komponenten för att visa resultatet
import PillButton from "./PillButton"; // Importerar knappen för att navigera
import QuizBackground from "./QuizBackground"; // Importerar bakgrundskomponenten för quizet
import { saveCompletedQuiz } from "../firebaseHelpers"; // Importerar funktion för att spara genomfört quiz i databasen

const Quiz = ({ onBackToDashboard, userId, quizId }) => {
  const [quizData, setQuizData] = useState([]); // State för att lagra quizdata
  const [currentIndex, setCurrentIndex] = useState(0); // Håller reda på den nuvarande frågans index
  const [score, setScore] = useState(0); // Håller reda på poängen
  const [isQuizFinished, setIsQuizFinished] = useState(false); // Håller reda på om quizet är klart
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Håller reda på de valda svaren
  const [isQuizSaved, setIsQuizSaved] = useState(false); // Håller reda på om quizet är sparat

  // Funktion för att blanda svaren slumpmässigt
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Byt plats på element i arrayen
    }
    return array;
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("/quizData.json"); // Hämtar quizdata från en JSON-fil
        const allQuestions = await response.json();
  
        // Filtrera frågorna baserat på quizId
        const filteredQuestions = allQuestions.filter(
          (question) => question.quizId === quizId
        );
  
        if (filteredQuestions.length === 0) {
          console.error(`No questions found for quizId: ${quizId}`);
          return;
        }
  
        // Blanda svaren för varje fråga
        const processedData = filteredQuestions.map((question) => ({
          ...question,
          all_answers: shuffle([
            question.correct_answer.trim(),
            ...question.incorrect_answers.map((ans) => ans.trim()),
          ]),
        }));
  
        setQuizData(processedData); // Sätt den bearbetade quizdatan i state
      } catch (error) {
        console.error("Error fetching quiz data:", error.message); // Logga fel om hämtning misslyckas
      }
    };
  
    fetchQuizData(); // Anropa funktionen för att hämta quizdata
  }, [quizId]);

  // Funktion för att hantera när ett svar väljs
  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer.trim(), // Uppdatera det valda svaret för den aktuella frågan
    }));
  };

  // Funktion för att gå till nästa fråga
  const handleNext = () => {
    const currentQuestion = quizData[currentIndex];
    const userAnswer = selectedAnswers[currentQuestion.id];
    const correctAnswer = currentQuestion.correct_answer.trim();

    if (userAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1); // Om svaret är rätt, öka poängen
    }

    if (currentIndex < quizData.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1); // Gå till nästa fråga om det finns fler frågor
    } else {
      setIsQuizFinished(true); // Om alla frågor är besvarade, markera quizet som klart
    }
  };

  // Funktion för att spara och avsluta quizet
  const handleCompleteQuiz = async () => {
    try {
      // Beräkna användarens svar
      const userAnswers = quizData.map((question) => ({
        questionId: question.id,
        userAnswer: selectedAnswers[question.id] || null, // Hämta det valda svaret eller null om inget svar valts
      }));
  
      // Beräkna antalet rätta svar
      const correctAnswers = quizData.filter((question) => {
        const userAnswer = selectedAnswers[question.id] || null;
        return userAnswer === question.correct_answer.trim(); // Jämför svaret med det korrekta svaret
      }).length;
  
      const totalQuestions = quizData.length; // Hämta totalt antal frågor
  
      // Spara quizet med resultat och totala frågor
      const completedQuizId = await saveCompletedQuiz(
        userId,
        quizId,
        userAnswers,
        correctAnswers, // Skicka rätta svar
        totalQuestions  // Skicka totalt antal frågor
      );
  
      console.log("Completed quiz saved with ID:", completedQuizId);
      alert("Quiz sparat som genomfört!"); // Visa meddelande när quizet har sparats
      onBackToDashboard(); // Gå tillbaka till dashboard
    } catch (error) {
      console.error("Error saving quiz:", error.message);
      alert("Det gick inte att spara quizet. Försök igen."); // Visa felmeddelande om sparning misslyckas
    }
  };

  return (
    <div
      className="quiz-background"
      style={{ height: "100vh", overflow: "hidden", position: "relative" }}
    >
      <QuizBackground currentQuestion={currentIndex} /> {/* Visa quizets bakgrund */}
      <div className="quiz-content">
        {isQuizFinished ? (
          <QuizResult
            score={score}
            totalQuestions={quizData.length}
            quizData={quizData}
            selectedAnswers={selectedAnswers}
            onCompleteQuiz={handleCompleteQuiz} // Skicka funktionen för att slutföra quizet
            onBackToDashboard={() => {
              if (isQuizSaved) {
                onBackToDashboard(); // Gå tillbaka till dashboard om quizet är sparat
              } else {
                alert("Vänligen spara quizet innan du går vidare.");
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
                progress={((currentIndex + 1) / quizData.length) * 100} // Beräkna progressen baserat på frågans index
                onSelectAnswer={(answer) =>
                  handleAnswerSelect(quizData[currentIndex].id, answer) // Hantera val av svar
                }
              />
            )}
            <div className="button-container">
              <PillButton
                text={
                  currentIndex < quizData.length - 1
                    ? "Nästa fråga" // Visa "Nästa fråga" om vi inte är på sista frågan
                    : "Visa resultat" // Visa "Visa resultat" på sista frågan
                }
                icon={faCircleRight}
                onClick={handleNext} // Hantera klick för att gå vidare
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz; // Exportera Quiz-komponenten för användning i andra delar av appen
