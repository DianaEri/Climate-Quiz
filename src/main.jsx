// Importerar StrictMode från React för att säkerställa bättre utvecklingspraxis
import { StrictMode } from 'react';
// Importerar createRoot från ReactDOM för att skapa en root och rendera komponenter
import { createRoot } from 'react-dom/client';
// Importerar huvudkomponenten (App) från App.jsx
import App from './App.jsx';

// Skapar en root där vår React-applikation kommer att renderas
createRoot(document.getElementById('root')).render(
  // StrictMode är en hjälpkomponent som hjälper till att hitta potentiella problem i utvecklingsläget
  <StrictMode>
    {/* Här renderar vi vår App-komponent */}
    <App />
  </StrictMode>
);
