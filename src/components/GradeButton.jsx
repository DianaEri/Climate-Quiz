import React from 'react';

const GradeButton = ({ svg, isActive, onClick }) => {
  return (
    <div
      className={`grade-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div
        className="grade-svg"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
};

export default GradeButton;