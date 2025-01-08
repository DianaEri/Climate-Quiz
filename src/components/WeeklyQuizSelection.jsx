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

        const uniqueQuizIds = Array.from(new Set(data.map((quiz) => quiz.quizId)));
        const uniqueQuizObjects = uniqueQuizIds.map((id) => ({
          quizId: id,
          name: `Quiz ${id.replace("quiz", "")}`, // Optionally format names
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
      <div className="ranking-container">
        <SectionHeading
          mainIcon={vWhiteIcon}
          mainText="älj"
          subText="Quiz"
          subIcon={medal}
        />
        <SubHeading text="Välj en quiz att spela:" className="subheading-left" />
        <div className="quizchoice-container"> {/* Added class to the parent div */}
          {uniqueQuizzes.map((quiz) => (
            <button
              onClick={() => onSelectQuiz(quiz.quizId)}
              key={quiz.quizId}
              className="quiz-button" // Add the class for styling
            >
              {quiz.name} {/* The text part of the button */}
              <FontAwesomeIcon 
                icon={faSquareUpRight} 
                className="quiz-button-icon" 
              /> {/* The icon comes after the text */}
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
