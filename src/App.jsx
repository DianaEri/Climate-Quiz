import React, { useState } from 'react';
import Home from './components/Home'; 
import StudentDashboard from './components/StudentDashboard'; 
import TeacherDashboard from './components/TeacherDashboard'; 
import Quiz from './components/Quiz'; 
import Ranking from './components/Ranking'; 
import CompletedQuizzes from './components/CompletedQuizzes'; 
import WeeklyQuizSelection from './components/WeeklyQuizSelection'; 
import QuizDetails from './components/QuizDetails'; 
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
            />
          ) : showCompletedQuizzes ? (
            <CompletedQuizzes
              userId={userId}
              onBackToDashboard={() => setShowCompletedQuizzes(false)}
              onViewQuizDetails={(quizId, completedQuizId) => {
                setCurrentQuizId(quizId); // Set the selected quiz ID
                setSelectedCompletedQuizId(completedQuizId); // Set the unique completed quiz ID
                setShowQuizDetails(true); // Navigate to the quiz details page
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
