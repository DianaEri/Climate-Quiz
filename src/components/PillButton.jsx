import React from 'react'; // Importerar React för att använda JSX
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importerar FontAwesomeIcon för att använda ikoner

// PillButton-komponenten som renderar en knapp med text och en ikon
const PillButton = ({ onClick, text, icon }) => {
  return (
    <button className="login-button" onClick={onClick}> {/* Knapp som anropar onClick-funktionen när den klickas */}
      <span className="button-text">{text}</span> {/* Visar texten som skickas in via props */}
      <FontAwesomeIcon icon={icon} className="button-icon" /> {/* Visar ikonen som skickas in via props */}
    </button>
  );
};

export default PillButton; // Exporterar PillButton-komponenten för användning i andra delar av appen

