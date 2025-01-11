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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [showWeeklyQuizzes, setShowWeeklyQuizzes] = useState(false);
  const [showQuizDetails, setShowQuizDetails] = useState(false);
  const [currentQuizId, setCurrentQuizId] = useState(null);
  const [selectedCompletedQuizId, setSelectedCompletedQuizId] = useState(null);
  const [showCompletedQuizzes, setShowCompletedQuizzes] = useState(false);

  const userId = "i69gyRz2uDNTrvt5gYDeJOQaIlt1"; // Replace with logic to fetch authenticated user's ID

  // Handle page navigation based on the selected page
  const handleNavigation = (path) => {
    console.log("Navigating to:", path);
  
    // Reset all views to false
    setShowQuiz(false);
    setShowRanking(false);
    setShowWeeklyQuizzes(false);
    setShowQuizDetails(false);
    setShowCompletedQuizzes(false);
  
    // Activate the specific page based on the path
    switch (path) {
      case 'StudentDashboard':
        setShowStudentDashboard(true); // Show Student Dashboard
        break;
      case 'WeeklyQuizSelection':
        setShowWeeklyQuizzes(true); // Show Weekly Quiz Selection
        break;
      case 'Ranking':
        setShowRanking(true); // Show Ranking page
        break;
      case 'CompletedQuiz':
        setShowCompletedQuizzes(true); // Show Completed Quizzes page
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    console.log("Is Logged In:", isLoggedIn);
    console.log("User Type:", userType);
  }, [isLoggedIn, userType]); // Re-run the effect whenever `isLoggedIn` or `userType` changes

  return (
    <div className={isLoggedIn ? (userType === 'student' ? 'student-view' : 'teacher-view') : 'home-view'}>
      {isLoggedIn ? (
        userType === 'student' ? (
          showQuizDetails ? (
            <QuizDetails
              userId={userId}
              quizId={currentQuizId}
              completedQuizId={selectedCompletedQuizId}
              onBackToCompletedQuizzes={() => {
                setShowQuizDetails(false);
                setSelectedCompletedQuizId(null); 
              }}
              handleNavigation={handleNavigation} // Pass handleNavigation here
            />
          ) : showQuiz ? (
            <Quiz
              onBackToDashboard={() => setShowQuiz(false)} 
              userId={userId} 
              quizId={currentQuizId}
            />
          ) : showRanking ? (
            <Ranking onBackClick={() => setShowRanking(false)} />
          ) : showWeeklyQuizzes ? (
            <WeeklyQuizSelection
              onSelectQuiz={(quizId) => {
                setCurrentQuizId(quizId);
                setShowQuiz(true);
              }}
              onBackToDashboard={() => setShowWeeklyQuizzes(false)}
              onViewQuizDetails={(quizId, completedQuizId) => {
                setCurrentQuizId(quizId);
                setSelectedCompletedQuizId(completedQuizId);
                setShowQuizDetails(true);
              }}
              handleNavigation={handleNavigation} 
            />
          ) : showCompletedQuizzes ? (
            <CompletedQuiz
              userId={userId}
              onBackToDashboard={() => setShowCompletedQuizzes(false)}
              onViewQuizDetails={(quizId, completedQuizId) => {
                setCurrentQuizId(quizId);
                setSelectedCompletedQuizId(completedQuizId);
                setShowQuizDetails(true);
              }}
              handleNavigation={handleNavigation} 
            />
          ) : (
            <StudentDashboard
              onStartQuiz={(quizId) => {
                setCurrentQuizId(quizId);
                setShowQuiz(true);
              }}
              onStartWeeklyQuiz={() => setShowWeeklyQuizzes(true)}
              onViewRanking={() => setShowRanking(true)}
              onViewCompletedQuizzes={() => setShowCompletedQuizzes(true)}
              handleNavigation={handleNavigation} // Pass handleNavigation here
            />
          )
        ) : (
          <TeacherDashboard />
        )
      ) : (
        <Home setLoggedIn={setIsLoggedIn} setUserType={setUserType} />
      )}
    </div>
  );  
};

export default App;
