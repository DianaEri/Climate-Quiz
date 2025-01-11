import React from 'react';

// GradeButton-komponenten används för att skapa en knapp som representerar ett betyg
// Den tar emot tre props:
// - grade: Betyget som representeras (t.ex. A, B, C, etc.)
// - isActive: Boolean som avgör om knappen är aktiv eller inte
// - onClick: Funktion som körs när knappen klickas på
const GradeButton = ({ grade, isActive, onClick }) => {
  // Bestämmer vilken SVG som ska användas baserat på om knappen är aktiv eller inte
  const svgContent = isActive ? gradeSvgs[grade].gradient : gradeSvgs[grade].monochrome;
  
  return (
    // Button-elementet som representerar betyget
    // Klassen "active" läggs till om knappen är aktiv
    <button
      className={`grade-button ${isActive ? 'active' : ''}`}
      onClick={onClick} // Anropar onClick-funktionen när knappen klickas
    >
      <div
        className="grade-svg" // Div som håller på med SVG:n för betyget
        dangerouslySetInnerHTML={{ __html: svgContent }} // Sätter SVG:n i div:en
      />
    </button>
  );
};

export default GradeButton; // Exporterar GradeButton-komponenten så att den kan användas i andra delar av appen
