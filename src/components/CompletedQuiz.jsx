import React, { useEffect, useState } from 'react';
import { getCompletedQuizzes } from '../firebaseHelpers'; // Ensure this is imported correctly
import studentBackground from '../assets/student_bg.svg';
import MobileNavbar from './MobileNavbar';
import SectionHeading from './SectionHeading';
import green_mind from '../assets/green_mind.svg';
import fWhiteIcon from '../assets/f_white.svg';
import SubHeading from './SubHeading';
import FilterButton from './FilterButton';
import PillButton from './PillButton';
import { faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons'; // Import the left and right arrow icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CompletedQuiz = ({ userId, onBackToDashboard, onViewQuizDetails }) => {
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [isDescending, setIsDescending] = useState(false); // For sorting by score
  const [isNameDescending, setIsNameDescending] = useState(false); // For sorting by date

  // Map quizId to actual quiz names
  const quizNames = {
    quiz1: "Klimatkaos: Vad Vet Du Om Världens Förändring?",
    quiz2: "Havet Uteblir: Kan Du Rädda Stränderna?",
    quiz3: "Isjakt: Hur Mycket Vet Du Om Glaciärer?",
    quiz4: "CO2-Utmaningen: Vad Kan Du Om Fossila Bränslen?"
  };

  // Fetch completed quizzes from Firestore when the component mounts
  useEffect(() => {
    const fetchCompletedQuizzes = async () => {
      try {
        const quizzes = await getCompletedQuizzes(userId);
        setCompletedQuizzes(quizzes); // Store completed quizzes in state
      } catch (error) {
        console.error("Error fetching completed quizzes:", error);
      }
    };

    fetchCompletedQuizzes(); // Call function to fetch completed quizzes
  }, [userId]);

  // Handle sorting by Result (score)
  const handleResultFilter = () => {
    setIsDescending((prev) => !prev);
    const sortedQuizzes = [...completedQuizzes].sort((a, b) =>
      isDescending
        ? b.score - a.score
        : a.score - b.score
    );
    setCompletedQuizzes(sortedQuizzes);
  };

  // Handle sorting by Date
  const handleNameFilter = () => {
    setIsNameDescending((prev) => !prev);
    const sortedQuizzes = [...completedQuizzes].sort((a, b) =>
      isNameDescending
        ? new Date(b.completedAt) - new Date(a.completedAt)
        : new Date(a.completedAt) - new Date(b.completedAt)
    );
    setCompletedQuizzes(sortedQuizzes);
  };

  return (
    <div       
      className="teacher-view"
      style={{
        backgroundImage: `url(${studentBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <MobileNavbar />
      <div className="finishedquiz-container">
        <SectionHeading
          mainIcon={fWhiteIcon}
          mainText="ärdiga"
          subText="Quizzes"
          subIcon={green_mind}
        />
        
        {/* Filter Buttons */}
        <div className="filter-container">
          <SubHeading text="Sortera" />
          <FilterButton
            label="Resultat"
            isDescending={isDescending}
            onFilter={handleResultFilter}
          />
          <FilterButton
            label="Datum"
            isDescending={isNameDescending}
            onFilter={handleNameFilter}
          />
        </div>

        {/* Check if there are any completed quizzes */}
        {completedQuizzes.length === 0 ? (
          <p>Du har inte gjort några Quiz än, börja nu för att få en rank bland mästarna.</p>
        ) : (
          <ul className="completed-quizzes-list">
            {/* Loop through the completed quizzes and display them */}
            {completedQuizzes.map((quiz) => (
              <li key={quiz.completedQuizId}>
                {/* Display quiz name and completion date */}
                <p>
                  <strong>Quiz namn:</strong> {quizNames[quiz.quizId]} {/* Display the quiz name */}
                </p>
                <p>
                  <strong>Avklarad den:</strong> {new Date(quiz.completedAt).toLocaleString()} {/* Display the date */}
                </p>
                <p>
                  <strong>Antal rätt svar:</strong> {quiz.score}/{quiz.totalQuestions} {/* Display correct answers */}
                </p>

                {/* Button to view quiz details */}
                <button 
                  onClick={() => onViewQuizDetails(quiz.quizId, quiz.completedQuizId)} 
                  className="quiz-details-button"
                >
                  Visa Detaljer
                  {/* Add the FontAwesome right arrow icon after the text */}
                  <FontAwesomeIcon icon={faCircleRight} />
                </button>
              </li>
            ))}
          </ul>
        )}
        
        {/* Center the PillButton */}
        <div className="pill-button-container">
          <PillButton
            text="Tillbaka till Startsida"
            icon={faCircleLeft}
            onClick={onBackToDashboard}
          />
        </div>
      </div>
    </div>
  );
};

export default CompletedQuiz;
