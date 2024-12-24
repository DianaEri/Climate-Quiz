import React, { useState } from 'react';
import Home from './components/Home'; 
import StudentDashboard from './components/StudentDashboard'; 
import TeacherDashboard from './components/TeacherDashboard'; 
import Quiz from './components/Quiz'; 
import Ranking from './components/Ranking'; // Import Ranking
import './index.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [showRanking, setShowRanking] = useState(false); // State for Ranking page

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
            <Quiz onBackToDashboard={() => setShowQuiz(false)} />
          ) : showRanking ? (
            <Ranking onBackClick={() => setShowRanking(false)} /> // Handle "Tillbaka" for Ranking
          ) : (
            <StudentDashboard 
              onStartQuiz={() => setShowQuiz(true)} 
              onViewRanking={() => setShowRanking(true)} // Add navigation for Ranking
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
