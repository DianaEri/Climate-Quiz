import React, { useEffect, useState } from 'react';
import { getCompletedQuizzes } from '../firebaseHelpers'; // Fetch completed quizzes
import studentBackground from '../assets/student_bg.svg'; // Background image for the student view
import MobileNavbar from './MobileNavbar'; // Mobile navigation bar component
import SectionHeading from './SectionHeading'; // Section heading component
import green_mind from '../assets/green_mind.svg'; // Icon for section heading
import fWhiteIcon from '../assets/f_white.svg'; // Icon for section heading
import SubHeading from './SubHeading'; // Subheading component
import FilterButton from './FilterButton'; // Button for filtering quizzes
import PillButton from './PillButton'; // Button for navigating back to the dashboard
import { faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons'; // Import the left and right arrow icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesome for icons

const CompletedQuiz = ({ userId, onBackToDashboard, onViewQuizDetails, handleNavigation }) => {
  const [completedQuizzes, setCompletedQuizzes] = useState([]); // State to store completed quizzes
  const [isDescending, setIsDescending] = useState(false); // For sorting by score, initially set to false
  const [isNameDescending, setIsNameDescending] = useState(false); // For sorting by date, initially set to false
  const [currentPage, setCurrentPage] = useState(1); // Track the current page for pagination

  const quizzesPerPage = 4; // Number of quizzes displayed per page

  // Map quizId to actual quiz names for display
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
        const quizzes = await getCompletedQuizzes(userId); // Fetch completed quizzes using userId
        setCompletedQuizzes(quizzes); // Store completed quizzes in state
      } catch (error) {
        console.error("Error fetching completed quizzes:", error); // Log any errors if fetching fails
      }
    };

    fetchCompletedQuizzes(); // Call function to fetch completed quizzes
  }, [userId]); // Re-run this effect whenever `userId` changes

  // Handle sorting quizzes by Result (score)
  const handleResultFilter = () => {
    setIsDescending((prev) => !prev); // Toggle the sorting order
    const sortedQuizzes = [...completedQuizzes].sort((a, b) =>
      isDescending
        ? b.score - a.score // If descending, sort quizzes by highest score
        : a.score - b.score // If ascending, sort quizzes by lowest score
    );
    setCompletedQuizzes(sortedQuizzes); // Update the state with sorted quizzes
  };

  // Handle sorting quizzes by Date
  const handleNameFilter = () => {
    setIsNameDescending((prev) => !prev); // Toggle the sorting order by date
    const sortedQuizzes = [...completedQuizzes].sort((a, b) =>
      isNameDescending
        ? new Date(b.completedAt) - new Date(a.completedAt) // If descending, sort by latest date first
        : new Date(a.completedAt) - new Date(b.completedAt) // If ascending, sort by earliest date first
    );
    setCompletedQuizzes(sortedQuizzes); // Update the state with sorted quizzes
  };

  // Pagination: Get the quizzes for the current page
  const indexOfLastQuiz = currentPage * quizzesPerPage; // Index of the last quiz on the current page
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage; // Index of the first quiz on the current page
  const currentQuizzes = completedQuizzes.slice(indexOfFirstQuiz, indexOfLastQuiz); // Get the quizzes for the current page

  // Handle moving to the next page
  const nextPage = () => {
    if (currentPage * quizzesPerPage < completedQuizzes.length) {
      setCurrentPage((prev) => prev + 1); // Increment the current page if there are more quizzes to display
    }
  };

  // Handle moving to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1); // Decrement the current page if it's greater than 1
    }
  };

  return (
    <div
      className="teacher-view" // Container with a class to indicate the teacher's view
      style={{
        backgroundImage: `url(${studentBackground})`, // Background image for the page
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Mobile Navbar with the correct links */}
      <MobileNavbar
        links={[
          { label: 'Student Hörnan', path: 'StudentDashboard' }, // Link to Student Dashboard
          { label: 'Välj Din Quiz', path: 'WeeklyQuizSelection' }, // Link to Weekly Quiz Selection
          { label: 'Rank Mästare', path: 'Ranking' }, // Link to Ranking page
        ]}
        handleNavigation={handleNavigation} // Pass the handleNavigation function to the Navbar
      />
      
      <div className="finishedquiz-container">
        {/* Section heading */}
        <SectionHeading
          mainIcon={fWhiteIcon}
          mainText="ärdiga"
          subText="Quizzes"
          subIcon={green_mind}
        />
        
        {/* Filter Buttons for sorting quizzes */}
        <div className="filter-container">
          <SubHeading text="Sortera" /> {/* Subheading for filter options */}
          <FilterButton
            label="Resultat"
            isDescending={isDescending}
            onFilter={handleResultFilter} // Trigger sorting by score when clicked
          />
          <FilterButton
            label="Datum"
            isDescending={isNameDescending}
            onFilter={handleNameFilter} // Trigger sorting by date when clicked
          />
        </div>

        {/* Display message if no quizzes are found */}
        {completedQuizzes.length === 0 ? (
          <p>Du har inte gjort några Quiz än, börja nu för att få en rank bland mästarna.</p> // Message if no completed quizzes exist
        ) : (
          <ul className="completed-quizzes-list">
            {/* Loop through the completed quizzes and display them */}
            {currentQuizzes.map((quiz) => (
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
                  onClick={() => onViewQuizDetails(quiz.quizId, quiz.completedQuizId)} // Trigger quiz details view
                  className="quiz-details-button"
                >
                  Visa Detaljer {/* Button label */}
                  {/* Add the FontAwesome right arrow icon after the text */}
                  <FontAwesomeIcon icon={faCircleRight} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination buttons */}
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Föregående</button> {/* "Previous" button */}
          <button onClick={nextPage} disabled={currentPage * quizzesPerPage >= completedQuizzes.length}>Nästa</button> {/* "Next" button */}
        </div>

        {/* Center the PillButton */}
        <div className="pill-button-container">
          <PillButton
            text="Tillbaka till Startsida"
            icon={faCircleLeft}
            onClick={onBackToDashboard} // Trigger the function to go back to the dashboard
          />
        </div>
      </div>
    </div>
  );
};

export default CompletedQuiz;
