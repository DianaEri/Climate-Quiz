import React from 'react';
import recycleIcon from '../assets/recycle.svg'; // Adjust the path to match your SVG location

const Logo = () => {
  return (
    <div className="logo-container">
      <h1 className="logo-klimatet">Klimat</h1>
      <div className="logo-quizet">
        <span className="logo-quiz">Quizet</span>
        <img src={recycleIcon} alt="Recycle Icon" className="logo-icon" />
      </div>
    </div>
  );
};

export default Logo;
