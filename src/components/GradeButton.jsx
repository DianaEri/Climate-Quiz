import React from 'react';

const GradeButton = ({ grade, isActive, onClick }) => {
  const svgContent = isActive ? gradeSvgs[grade].gradient : gradeSvgs[grade].monochrome;
  
  return (
    <button
      className={`grade-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div
        className="grade-svg"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </button>
  );
};

export default GradeButton;
