import React from 'react';

const FilterButton = ({ onFilter }) => {
  return (
    <button className="filter-button" onClick={onFilter}>
      Filtrera Resultat
    </button>
  );
};

export default FilterButton;