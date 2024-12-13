import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp, faCircleDown } from '@fortawesome/free-solid-svg-icons';

const FilterButton = ({ isDescending, onFilter, label }) => {
  return (
    <button className="filter-button" onClick={onFilter}>
      {label}{' '}
      {isDescending ? (
        <FontAwesomeIcon icon={faCircleUp} className="filter-icon" />
      ) : (
        <FontAwesomeIcon icon={faCircleDown} className="filter-icon" />
      )}
    </button>
  );
};

export default FilterButton;

