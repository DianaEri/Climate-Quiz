import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
    { label: 'Student Hörnan', path: '/StudentDashboard' },
    { label: 'Välj Din Quiz', path: '/WeeklyQuizSelection' },
    { label: 'Färdiga Quizzes', path: '/CompletedQuiz' },
    { label: 'Rank Mästare', path: '/Ranking' },
  ];

  return (
    <Router>
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
          <>
            <MobileNavbar links={userType === 'student' ? studentLinks : []} />
            {userType === 'student' ? (
              <Routes>
                {/* Default route */}
                <Route path="/" element={<Navigate to="/StudentDashboard" />} />
                
                <Route
                  path="/StudentDashboard"
                  element={
                    <StudentDashboard
                      onStartQuiz={(quizId) => {
                        setCurrentQuizId(quizId);
                        setShowQuiz(true);
                      }}
                      onStartWeeklyQuiz={() => setShowWeeklyQuizzes(true)}
                      onViewRanking={() => setShowRanking(true)}
                      onViewCompletedQuizzes={() => setShowCompletedQuizzes(true)}
                    />
                  }
                />
                <Route
                  path="/WeeklyQuizSelection"
                  element={
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
                  }
                />
                <Route
                  path="/CompletedQuiz"
                  element={
                    <CompletedQuiz
                      userId={userId}
                      onBackToDashboard={() => setShowCompletedQuizzes(false)}
                      onViewQuizDetails={(quizId, completedQuizId) => {
                        setCurrentQuizId(quizId);
                        setSelectedCompletedQuizId(completedQuizId);
                        setShowQuizDetails(true);
                      }}
                    />
                  }
                />
                <Route
                  path="/Ranking"
                  element={<Ranking onBackClick={() => setShowRanking(false)} />}
                />
                <Route
                  path="/QuizDetails"
                  element={
                    <QuizDetails
                      userId={userId}
                      quizId={currentQuizId}
                      completedQuizId={selectedCompletedQuizId}
                      onBackToCompletedQuizzes={() => {
                        setShowQuizDetails(false);
                        setSelectedCompletedQuizId(null);
                      }}
                    />
                  }
                />
                <Route
                  path="/Quiz"
                  element={
                    <Quiz
                      onBackToDashboard={() => setShowQuiz(false)}
                      userId={userId}
                      quizId={currentQuizId}
                    />
                  }
                />
              </Routes>
            ) : (
              <Routes>
                {/* Default route for teachers */}
                <Route path="/" element={<Navigate to="/TeacherDashboard" />} />
                <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
              </Routes>
            )}
          </>
        ) : (
          <Routes>
            {/* Default route for non-logged-in users */}
            <Route path="/" element={<Home setLoggedIn={setIsLoggedIn} setUserType={setUserType} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
