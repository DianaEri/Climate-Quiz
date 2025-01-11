import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons'; // Importerar ikonen för höger cirkel

const RoundButton = () => {
  return (
    <div className="round-button" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {/* Texten på knappen */}
      <span className="button-label" style={{ fontSize: '16px', fontWeight: 'bold' }}>
        Öppna
      </span>
      {/* Ikonen för knappen */}
      <FontAwesomeIcon icon={faCircleRight} className="circle-up-icon" />
    </div>
  );
};

export default RoundButton; // Exporterar RoundButton-komponenten


