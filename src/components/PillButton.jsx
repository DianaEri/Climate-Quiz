import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PillButton = ({ onClick, text, icon }) => {
  return (
    <button className="login-button" onClick={onClick}>
      <span className="button-text">{text}</span>
      <FontAwesomeIcon icon={icon} className="button-icon" />
    </button>
  );
};

export default PillButton;
