import React from 'react';
import PropTypes from 'prop-types';

const SectionHeading = ({ mainIcon, mainText, subText = '', subIcon = null }) => {
  return (
    <div className="section-heading-container">
      <h1 className="section-heading-main">
        <img src={mainIcon} alt="Main Icon" className="section-heading-main-icon" />
        {mainText}
      </h1>
      <div className="section-heading-sub">
        <span className="section-heading-sub-text">{subText}</span>
        {subIcon && <img src={subIcon} alt="Sub Icon" className="section-heading-sub-icon" />}
      </div>
    </div>
  );
};

SectionHeading.propTypes = {
  mainIcon: PropTypes.string.isRequired, // Path to the main SVG icon
  mainText: PropTypes.string.isRequired, // Text for the main heading
  subText: PropTypes.string, // Optional text for the subheading
  subIcon: PropTypes.string, // Optional path to the subheading SVG icon
};

export default SectionHeading;
