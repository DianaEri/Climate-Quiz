import React from 'react';
import PropTypes from 'prop-types';

const SubHeading = ({ text }) => {
  return <h2 className="subheading">{text}</h2>;
};

SubHeading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SubHeading;
