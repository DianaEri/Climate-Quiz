import React from 'react'; // Importing React library to use JSX
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for icons
import { faSquareCaretUp, faSquareCaretDown } from '@fortawesome/free-solid-svg-icons'; // Importing specific icons for sorting

// FilterButton component accepts three props:
// - isDescending: Boolean indicating whether sorting is in descending order
// - onFilter: Function to trigger the sorting behavior when clicked
// - label: The label text to display on the button (e.g., "Resultat" or "Datum")
const FilterButton = ({ isDescending, onFilter, label }) => {
  return (
    // Button element for the filter, triggers onFilter function when clicked
    <button className="filter-button" onClick={onFilter}>
      {label}{' '} {/* Display the label passed as a prop */}
      
      {/* Conditionally render the up or down arrow based on the isDescending prop */}
      {isDescending ? (
        // If isDescending is true, show the up arrow (indicating descending order)
        <FontAwesomeIcon icon={faSquareCaretUp} className="filter-icon" />
      ) : (
        // If isDescending is false, show the down arrow (indicating ascending order)
        <FontAwesomeIcon icon={faSquareCaretDown} className="filter-icon" />
      )}
    </button>
  );
};

export default FilterButton; // Export the FilterButton component for use in other parts of the app
