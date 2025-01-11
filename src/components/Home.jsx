import React, { useState } from 'react'; // Importerar React och useState-hooken för att hantera komponentens tillstånd
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importerar metoden för inloggning med e-post och lösenord från Firebase
import { auth } from '../firebase'; // Importerar Firebase-authentisering från vår firebase-konfiguration
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Importerar FontAwesome-ikonen för användarens profil
import Logo from './Logo'; // Importerar Logo-komponenten som visar appens logotyp
import PillButton from './PillButton'; // Importerar PillButton-komponenten för knappar
import mobileBackground from '../assets/mobile-bg.svg'; // Bakgrundsbild för mobilvyn
import '../index.css'; // Importerar stilark för att formatera komponentens layout

// Home-komponenten som hanterar inloggning för användare
const Home = ({ setLoggedIn, setUserType }) => {
  const [email, setEmail] = useState(''); // State för att lagra användarens e-postadress
  const [password, setPassword] = useState(''); // State för att lagra användarens lösenord
  const [error, setError] = useState(''); // State för att hantera eventuella felmeddelanden vid inloggning

  // Funktion för att hantera inloggning
  const handleLogin = () => {
    console.log('Attempting login with email:', email); // Loggar försök till inloggning
    signInWithEmailAndPassword(auth, email, password) // Anropar Firebase inloggningsmetod
      .then((userCredential) => { // Om inloggningen lyckas
        const userEmail = userCredential.user.email; // Hämtar användarens e-postadress
        console.log('Login successful for email:', userEmail); // Loggar lyckad inloggning

        // Om användaren är en lärare eller student, sätt användartypen och logga in
        if (userEmail === 'teacher@example.com') {
          setUserType('teacher'); // Sätter användartypen till lärare
          console.log('User type set to teacher');
        } else if (userEmail === 'student@example.com') {
          setUserType('student'); // Sätter användartypen till student
          console.log('User type set to student');
        } else {
          setError('Unauthorized user'); // Om e-posten inte matchar en auktoriserad användare, sätt ett felmeddelande
          console.warn('Unauthorized user email:', userEmail); // Loggar icke-auktoriserad e-post
          return; // Avslutar om användaren inte är auktoriserad
        }
        setLoggedIn(true); // Sätter inloggningstillståndet till true
        console.log('Logged in state set to true');
      })
      .catch((err) => { // Om inloggningen misslyckas
        setError('Login failed: ' + err.message); // Sätter felmeddelande för misslyckad inloggning
        console.error('Login failed:', err.message); // Loggar felet
      });
  };

  return (
    <div
      className="home-view" // Klassnamn för att styla vyn
      style={{
        backgroundImage: `url(${mobileBackground})`, // Sätter bakgrundsbilden för mobilvyn
      }}
    >
      <div className="login-box"> {/* Inloggningslåda som innehåller fält för inloggning */}
        <Logo /> {/* Visar logotypen */}
        <h2 className="login-title">Logga in</h2> {/* Rubrik för inloggningsformuläret */}
        {error && <p className="error-message">{error}</p>} {/* Visar felmeddelande om det finns */}
        
        {/* Inmatningsfält för e-post */}
        <input
          type="email"
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Uppdaterar e-postens state vid ändring
        />
        
        {/* Inmatningsfält för lösenord */}
        <input
          type="password"
          className="login-input"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Uppdaterar lösenordets state vid ändring
        />
        
        {/* Logga in-knappen */}
        <PillButton onClick={handleLogin} text="Logga in" icon={faUserCircle} /> {/* Anropar handleLogin vid klick */}
      </div>
    </div>
  );
};

export default Home; // Exporterar Home-komponenten för användning i andra delar av appen
