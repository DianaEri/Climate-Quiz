import React, { useState } from 'react';
import Home from './components/Home'; 
import StudentDashboard from './components/StudentDashboard'; 
import TeacherDashboard from './components/TeacherDashboard'; 


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

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
          <StudentDashboard />
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
