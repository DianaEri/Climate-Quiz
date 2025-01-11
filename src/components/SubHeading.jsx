import React from 'react';
import PropTypes from 'prop-types';

const SubHeading = ({ text, className = '' }) => {
  return <h2 className={`${className} subheading`}>{text}</h2>;  // Dynamically apply the className
};

SubHeading.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string, // Make className optional
};

export default SubHeading;


