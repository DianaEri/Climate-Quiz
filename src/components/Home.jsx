import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';
import PillButton from './PillButton';
import mobileBackground from '../assets/mobile-bg.svg';
import '../index.css';

const Home = ({ setLoggedIn, setUserType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userEmail = userCredential.user.email;
        if (userEmail === 'teacher@example.com') {
          setUserType('teacher');
        } else if (userEmail === 'student@example.com') {
          setUserType('student');
        } else {
          setError('Unauthorized user');
          return;
        }
        setLoggedIn(true);
      })
      .catch((err) => setError('Login failed: ' + err.message));
  };

  return (
    <div
      className="home-view"
      style={{
        backgroundImage: `url(${mobileBackground})`,
      }}
    >
      <div className="login-box">
        <Logo />
        <h2 className="login-title">Logga in</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PillButton onClick={handleLogin} text="Logga in" icon={faUserCircle} />
      </div>
    </div>
  );
};

export default Home;
