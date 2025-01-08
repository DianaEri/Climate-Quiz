import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faSquareUpRight } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon
import studentBackground from '../assets/student_bg.svg';
import MobileNavbar from './MobileNavbar';
import PillButton from './PillButton'; // Import the PillButton component
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'; // Import the left arrow icon
import SectionHeading from './SectionHeading';
import vWhiteIcon from '../assets/v_white.svg';
import medal from '../assets/megaphone.svg';
import SubHeading from './SubHeading';

const WeeklyQuizSelection = ({ onSelectQuiz, onBackToDashboard }) => {
  const [quizData, setQuizData] = useState([]);
  const [uniqueQuizzes, setUniqueQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("/quizData.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch quiz data: ${response.statusText}`);
        }
        const data = await response.json();

        // Map quizId to actual quiz names
        const quizNames = {
          quiz1: "Klimatkaos: Vad Vet Du Om Världens Förändring?",
          quiz2: "Havet Uteblir: Kan Du Rädda Stränderna?",
          quiz3: "Isjakt: Hur Mycket Vet Du Om Glaciärer?",
          quiz4: "CO2-Utmaningen: Vad Kan Du Om Fossila Bränslen?"
        };

        const uniqueQuizIds = Array.from(new Set(data.map((quiz) => quiz.quizId)));
        const uniqueQuizObjects = uniqueQuizIds.map((id) => ({
          quizId: id,
          name: quizNames[id] || `Quiz ${id.replace("quiz", "")}`, // Assign names based on the quizId
        }));

        setQuizData(data);
        setUniqueQuizzes(uniqueQuizObjects);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, []);

  return (
    <div
      className="student-view" // Reuse the same class for consistent styling
      style={{
        backgroundImage: `url(${studentBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <MobileNavbar />
      <div className="choice-container">
        <SectionHeading
          mainIcon={vWhiteIcon}
          mainText="älj"
          subText="Quiz"
          subIcon={medal}
        />
        <SubHeading text="Välj en quiz att spela:" className="subheading-left" />
        <div className="quizchoice-container">
          {uniqueQuizzes.map((quiz) => (
            <button
              onClick={() => onSelectQuiz(quiz.quizId)}
              key={quiz.quizId}
              className="quiz-button" // Add the class for styling
            >
              {quiz.name} {/* Display the quiz name here */}
              <FontAwesomeIcon 
                icon={faSquareUpRight} 
                className="quiz-button-icon" 
              />
            </button>
          ))}
        </div>
        <PillButton
          text="Tillbaka till Startsida"
          icon={faCircleLeft}
          onClick={onBackToDashboard}
        />
      </div>
    </div>
  );
};

export default WeeklyQuizSelection;
