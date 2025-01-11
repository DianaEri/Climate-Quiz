import React from 'react';
import PropTypes from 'prop-types'; // Importerar PropTypes för att definiera typer för komponentens props

const SectionHeading = ({ mainIcon, mainText, subText = '', subIcon = null }) => {
  return (
    <div className="section-heading-container"> {/* Huvudcontainer för rubriken */}
      <h1 className="section-heading-main">
        {/* Visar huvudikonen */}
        <img src={mainIcon} alt="Main Icon" className="section-heading-main-icon" />
        {mainText} {/* Visar huvudtexten */}
      </h1>
      <div className="section-heading-sub">
        <span className="section-heading-sub-text">{subText}</span> {/* Visar eventuellt undertexten */}
        {/* Om subIcon finns, visa underikonen */}
        {subIcon && <img src={subIcon} alt="Sub Icon" className="section-heading-sub-icon" />}
      </div>
    </div>
  );
};

// Definierar typer och om vissa props är obligatoriska
SectionHeading.propTypes = {
  mainIcon: PropTypes.string.isRequired, // Sökväg till huvud-SVG-ikonen
  mainText: PropTypes.string.isRequired, // Text för huvudrubriken
  subText: PropTypes.string, // Valfri text för underrubriken
  subIcon: PropTypes.string, // Valfri sökväg till underrubriken ikonen
};

export default SectionHeading; // Exporterar SectionHeading-komponenten
