import React, { useState } from 'react';
import Home from './components/Home'; 
import StudentDashboard from './components/StudentDashboard'; 
import TeacherDashboard from './components/TeacherDashboard'; 
import Ranking from './components/Ranking'; // Import Ranking component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [view, setView] = useState('home'); // Manage different views

  const renderView = () => {
    if (!isLoggedIn) {
      return (
        <Home
          setLoggedIn={setIsLoggedIn}
          setUserType={setUserType}
          onNavigate={() => setView('home')}
        />
      );
    }

    if (userType === 'student') {
      switch (view) {
        case 'studentDashboard':
          return <StudentDashboard onRankingClick={() => setView('ranking')} />;
        case 'ranking':
          return <Ranking onBackClick={() => setView('studentDashboard')} />;
        default:
          return <StudentDashboard onRankingClick={() => setView('ranking')} />;
      }
    }

    if (userType === 'teacher') {
      return <TeacherDashboard />;
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
      {renderView()}
    </div>
  );
};

export default App;
