import React from 'react';
import recycleIcon from '../assets/logo_climate.svg';
import kWhiteIcon from '../assets/k_white.svg'; 

const Logo = () => {
  return (
    <div className="logo-container">
      <h1 className="logo-klimatet">
        <img src={kWhiteIcon} alt="K" className="logo-k-icon" />limat
      </h1>
      <div className="logo-quizet">
        <span className="logo-quiz">Quizet</span>
        <img src={recycleIcon} alt="Recycle Icon" className="logo-icon" />
      </div>
    </div>
  );
};

export default Logo;
