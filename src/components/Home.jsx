import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Import the user circle icon
import Logo from './Logo';
import PillButton from './PillButton';
import mobileBackground from '../assets/mobile-bg.svg';

const Home = ({ setLoggedIn, setUserType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userEmail = userCredential.user.email;

        // Set user type based on email
        if (userEmail === 'teacher@example.com') {
          setUserType('teacher');
        } else if (userEmail === 'student@example.com') {
          setUserType('student');
        } else {
          setError('Unauthorized user');
          return;
        }

        // Set logged in status
        setLoggedIn(true);
      })
      .catch((err) => setError('Login failed: ' + err.message));
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${mobileBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Logo />
      <h2>Logga in</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PillButton onClick={handleLogin} text="Logga in" icon={faUserCircle} />
    </div>
  );
};

export default Home;
