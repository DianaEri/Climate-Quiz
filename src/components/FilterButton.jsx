import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretUp, faSquareCaretDown } from '@fortawesome/free-solid-svg-icons';

const FilterButton = ({ isDescending, onFilter, label }) => {
  return (
    <button className="filter-button" onClick={onFilter}>
      {label}{' '}
      {isDescending ? (
        <FontAwesomeIcon icon={faSquareCaretUp} className="filter-icon" />
      ) : (
        <FontAwesomeIcon icon={faSquareCaretDown} className="filter-icon" />
      )}
    </button>
  );
};

export default FilterButton;

