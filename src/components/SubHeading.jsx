import React from 'react';
import PropTypes from 'prop-types';

const SubHeading = ({ text, className = '' }) => {
  return <h2 className={`${className} subheading`}>{text}</h2>;  // Dynamiskt tillämpa className
};

SubHeading.propTypes = {
  text: PropTypes.string.isRequired, // Texten för underrubriken
  className: PropTypes.string, // Gör className valfri
};

export default SubHeading; // Exporterar SubHeading-komponenten
