import React, { useState } from 'react';
import Home from './components/Home'; 
import StudentDashboard from './components/StudentDashboard'; 
import TeacherDashboard from './components/TeacherDashboard'; 
import Quiz from './components/Quiz'; 
import Ranking from './components/Ranking'; 
import CompletedQuizzes from './components/CompletedQuizzes'; // Ensure this is imported
import './index.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [showRanking, setShowRanking] = useState(false); // State for Ranking page
  const [currentQuizId, setCurrentQuizId] = useState(null); // Track which quiz is selected
  const [showCompletedQuizzes, setShowCompletedQuizzes] = useState(false); // State for "Avklarade Quiz" page

  // Example user data (replace with actual user management/authentication logic)
  const userId = "i69gyRz2uDNTrvt5gYDeJOQaIlt1"; // Replace with logic to fetch authenticated user's ID

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
          showQuiz ? (
            <Quiz
              onBackToDashboard={() => setShowQuiz(false)} 
              userId={userId} 
              quizId={currentQuizId}
            />
          ) : showRanking ? (
            <Ranking onBackClick={() => setShowRanking(false)} />
          ) : showCompletedQuizzes ? (
            <CompletedQuizzes 
              userId={userId} 
              onBackToDashboard={() => setShowCompletedQuizzes(false)}
            />
          ) : (
            <StudentDashboard 
              onStartQuiz={(quizId) => {
                setCurrentQuizId(quizId);
                setShowQuiz(true);
              }} 
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

