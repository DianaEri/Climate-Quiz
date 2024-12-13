import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';

const RoundButton = () => {
  return (
    <div className="round-button">
      <FontAwesomeIcon icon={faCircleUp} className="circle-up-icon" />
    </div>
  );
};

export default RoundButton;
