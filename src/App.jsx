import React, { useState } from 'react';
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

  const handleNavigation = (path) => {
    console.log("Navigating to:", path); // Debugging line
    // Reset all other views and display the relevant view based on the navigation path
    switch (path) {
      case 'WeeklyQuizSelection':
        setShowWeeklyQuizzes(true);
        setShowRanking(false);
        setShowQuiz(false);
        setShowQuizDetails(false);
        setShowCompletedQuizzes(false);
        break;
      case 'CompletedQuiz':
        setShowCompletedQuizzes(true);
        setShowQuiz(false);
        setShowQuizDetails(false);
        setShowRanking(false);
        setShowWeeklyQuizzes(false);
        break;
      case 'Ranking':
        setShowRanking(true);
        setShowQuiz(false);
        setShowQuizDetails(false);
        setShowCompletedQuizzes(false);
        setShowWeeklyQuizzes(false);
        break;
      case 'StudentDashboard':
        setShowWeeklyQuizzes(false);
        setShowQuiz(false);
        setShowQuizDetails(false);
        setShowCompletedQuizzes(false);
        setShowRanking(false);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={
        isLoggedIn
          ? userType === 'student'
            ? 'student-view'
            : 'teacher-view'
          : 'home-view'
      }
    >
      {isLoggedIn ? (
        userType === 'student' ? (
          showQuizDetails ? (
            <QuizDetails
              userId={userId}
              quizId={currentQuizId} // Use currentQuizId here
              completedQuizId={selectedCompletedQuizId} // Pass completedQuizId
              onBackToCompletedQuizzes={() => {
                setShowQuizDetails(false);
                setSelectedCompletedQuizId(null); // Reset the selectedCompletedQuizId
              }}
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
                setSelectedCompletedQuizId(completedQuizId); // Set the unique completed quiz ID
                setShowQuizDetails(true); // Navigate to quiz details
              }}
              handleNavigation={handleNavigation} // Pass handleNavigation here
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
              handleNavigation={handleNavigation} // Pass handleNavigation here
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
