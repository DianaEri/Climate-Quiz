import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import Quiz from './components/Quiz';
import Ranking from './components/Ranking';
import WeeklyQuizSelection from './components/WeeklyQuizSelection';
import QuizDetails from './components/QuizDetails';
import CompletedQuiz from './components/CompletedQuiz';
import './index.css';

// App-komponenten är huvudkomponenten för applikationen
// Här hanteras navigering, visning av olika komponenter beroende på användartyp (student/lärare), och visning av specifika vyer
const App = () => {
  // State för att hantera användarinloggning och visning av olika komponenter
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Om användaren är inloggad eller inte
  const [userType, setUserType] = useState(''); // Användartyp (student eller lärare)
  const [showQuiz, setShowQuiz] = useState(false); // Om quiz ska visas
  const [showRanking, setShowRanking] = useState(false); // Om ranking ska visas
  const [showWeeklyQuizzes, setShowWeeklyQuizzes] = useState(false); // Om veckans quiz ska visas
  const [showQuizDetails, setShowQuizDetails] = useState(false); // Om quizdetaljer ska visas
  const [currentQuizId, setCurrentQuizId] = useState(null); // Det aktuella quiz-ID:t
  const [selectedCompletedQuizId, setSelectedCompletedQuizId] = useState(null); // Det valda genomförda quiz-ID:t
  const [showCompletedQuizzes, setShowCompletedQuizzes] = useState(false); // Om färdiga quiz ska visas

  const userId = "i69gyRz2uDNTrvt5gYDeJOQaIlt1"; // Ersätt med logik för att hämta inloggad användares ID

  // Funktion för att hantera navigering mellan olika sidor
  const handleNavigation = (path) => {
    console.log("Navigerar till:", path);
    
    // Nollställ alla vyer till false för att förhindra konflikter
    setShowQuiz(false);
    setShowRanking(false);
    setShowWeeklyQuizzes(false);
    setShowQuizDetails(false);
    setShowCompletedQuizzes(false);

    // Aktivera den specifika sidan baserat på den valda vägen
    switch (path) {
      case 'StudentDashboard': // Om vi navigerar till StudentDashboard
        setUserType('student');
        break;
      case 'WeeklyQuizSelection': // Om vi navigerar till WeeklyQuizSelection
        setShowWeeklyQuizzes(true);
        break;
      case 'Ranking': // Om vi navigerar till Ranking
        setShowRanking(true);
        break;
      case 'CompletedQuiz': // Om vi navigerar till CompletedQuiz
        setShowCompletedQuizzes(true);
        break;
      case 'QuizDetails': // Om vi navigerar till QuizDetails
        setShowQuizDetails(true); 
        break;
      default:
        break;
    }
  };

  return (
    <div className={isLoggedIn ? (userType === 'student' ? 'student-view' : 'teacher-view') : 'home-view'}>
      {isLoggedIn ? ( // Om användaren är inloggad
        userType === 'student' ? ( // Om användaren är en student
          showQuizDetails ? ( // Om quizdetaljer ska visas
            <QuizDetails
              userId={userId}
              quizId={currentQuizId}
              completedQuizId={selectedCompletedQuizId}
              onBackToCompletedQuizzes={() => {
                setShowQuizDetails(false); // Gå tillbaka till färdiga quiz
                setSelectedCompletedQuizId(null); // Nollställ det valda genomförda quiz-ID:t
              }}
              handleNavigation={handleNavigation} // Passar hanteraren för navigering till QuizDetails
            />
          ) : showQuiz ? ( // Om quiz ska visas
            <Quiz
              onBackToDashboard={() => setShowQuiz(false)} // Gå tillbaka till dashboard
              userId={userId}
              quizId={currentQuizId}
            />
          ) : showRanking ? ( // Om ranking ska visas
            <Ranking 
              onBackClick={() => setShowRanking(false)} // Gå tillbaka från ranking
              handleNavigation={handleNavigation} 
            />
          ) : showWeeklyQuizzes ? ( // Om veckans quiz ska visas
            <WeeklyQuizSelection
              onSelectQuiz={(quizId) => { // Om ett quiz väljs
                setCurrentQuizId(quizId);
                setShowQuiz(true); // Visa quiz
              }}
              onBackToDashboard={() => setShowWeeklyQuizzes(false)} // Gå tillbaka från veckans quiz
              onViewQuizDetails={(quizId, completedQuizId) => { // Om detaljer för ett quiz ska visas
                setCurrentQuizId(quizId);
                setSelectedCompletedQuizId(completedQuizId);
                setShowQuizDetails(true);
              }}
              handleNavigation={handleNavigation} 
            />
          ) : showCompletedQuizzes ? ( // Om färdiga quiz ska visas
            <CompletedQuiz
              userId={userId}
              onBackToDashboard={() => setShowCompletedQuizzes(false)} // Gå tillbaka från färdiga quiz
              onViewQuizDetails={(quizId, completedQuizId) => { // Om detaljer för ett genomfört quiz ska visas
                setCurrentQuizId(quizId);
                setSelectedCompletedQuizId(completedQuizId);
                setShowQuizDetails(true);
              }}
              handleNavigation={handleNavigation} 
            />
          ) : ( // Om vi inte är på någon specifik sida, visa studentens dashboard
            <StudentDashboard
              onStartQuiz={(quizId) => { // Om quiz ska startas
                setCurrentQuizId(quizId);
                setShowQuiz(true);
              }}
              onStartWeeklyQuiz={() => setShowWeeklyQuizzes(true)} // Om veckans quiz ska startas
              onViewRanking={() => setShowRanking(true)} // Om ranking ska visas
              onViewCompletedQuizzes={() => setShowCompletedQuizzes(true)} // Om färdiga quiz ska visas
              handleNavigation={handleNavigation} // Passar hanteraren för navigering till StudentDashboard
            />
          )
        ) : (
          <TeacherDashboard /> // Om användaren är lärare, visa lärarens dashboard
        )
      ) : ( // Om användaren inte är inloggad, visa startsidan
        <Home setLoggedIn={setIsLoggedIn} setUserType={setUserType} />
      )}
    </div>
  );
};

export default App; // Exporterar App-komponenten så att den kan användas i andra delar av applikationen
