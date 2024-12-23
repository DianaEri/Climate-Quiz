import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';

const RoundButton = () => {
  return (
    <div className="round-button" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span className="button-label" style={{ fontSize: '16px', fontWeight: 'bold' }}>
        Öppna
      </span>
      <FontAwesomeIcon icon={faCircleRight} className="circle-up-icon" />
    </div>
  );
};

export default RoundButton;

