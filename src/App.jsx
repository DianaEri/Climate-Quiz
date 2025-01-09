import React, { useState } from 'react';
import MobileNavbar from './components/MobileNavbar';
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

  const studentLinks = [
    { label: 'Student Hörnan', action: () => resetToDashboard() },
    { label: 'Välj Din Quiz', action: () => setShowWeeklyQuizzes(true) },
    { label: 'Färdiga Quizzes', action: () => setShowCompletedQuizzes(true) },
    { label: 'Rank Mästare', action: () => setShowRanking(true) },
  ];

  const resetToDashboard = () => {
    setShowQuiz(false);
    setShowRanking(false);
    setShowWeeklyQuizzes(false);
    setShowQuizDetails(false);
    setShowCompletedQuizzes(false);
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
      {isLoggedIn && userType === 'student' && (
        <MobileNavbar links={studentLinks} />
      )}

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
            />
          ) : showQuiz ? (
            <Quiz
              onBackToDashboard={resetToDashboard}
              userId={userId}
              quizId={currentQuizId}
            />
          ) : showRanking ? (
            <Ranking onBackClick={resetToDashboard} />
          ) : showWeeklyQuizzes ? (
            <WeeklyQuizSelection
              onSelectQuiz={(quizId) => {
                setCurrentQuizId(quizId);
                setShowQuiz(true);
              }}
              onBackToDashboard={resetToDashboard}
              onViewQuizDetails={(quizId, completedQuizId) => {
                setCurrentQuizId(quizId);
                setSelectedCompletedQuizId(completedQuizId);
                setShowQuizDetails(true);
              }}
            />
          ) : showCompletedQuizzes ? (
            <CompletedQuiz
              userId={userId}
              onBackToDashboard={resetToDashboard}
              onViewQuizDetails={(quizId, completedQuizId) => {
                setCurrentQuizId(quizId);
                setSelectedCompletedQuizId(completedQuizId);
                setShowQuizDetails(true);
              }}
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
