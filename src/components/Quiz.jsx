import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';
import Question from "./Question";
import QuizResult from "./QuizResult"; 


const Quiz = () => {
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
    fetch('/quizData.json') 
      .then(response => response.json())
      .then(data => {
        // Combine correct and incorrect answers and shuffle them
        data.forEach(p => {
          p.all_answers = shuffle([p.correct_answer, ...p.incorrect_answers]);
        });
        setQuizData(data); 
      });
  }, []);

  const handleNext = () => {
    const selectedOption = document.querySelector(`input[name="question_${currentIndex}"]:checked`);
    if (selectedOption) {
      const userAnswer = selectedOption.value;
      const correctAnswer = quizData[currentIndex].correct_answer;

      if (userAnswer === correctAnswer) {
        setScore(prevScore => prevScore + 1); 
      }
    }

    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsQuizFinished(true); 
    }
  }

  return (
    <div className="quiz-container">
      <FontAwesomeIcon icon={faCircleUp} className="circle-up-icon" />
      {isQuizFinished ? (
        <QuizResult 
          score={score} 
          totalQuestions={quizData.length} 
        />
      ) : (
        <>
          {quizData.length > 0 && (
            <Question
              key={currentIndex} // Add a key to force re-mount of the component, resets radio button when going to next page
              data={quizData[currentIndex]} 
              index={currentIndex} 
              numberOfQuestion={quizData.length}
              progress={((currentIndex + 1) / quizData.length) * 100}
            />
          )}
          <div className="button-container">
            <button className="next-button" onClick={handleNext}>
              {currentIndex < quizData.length - 1 ? 'Nästa fråga' : 'Skicka in'}  <FontAwesomeIcon icon={faCircleUp} className="button-icon" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
