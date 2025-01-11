import React from 'react'; // Importerar React-biblioteket för att använda JSX
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importerar FontAwesomeIcon för ikoner
import { faSquareCaretUp, faSquareCaretDown } from '@fortawesome/free-solid-svg-icons'; // Importerar specifika ikoner för sortering

// FilterButton-komponenten accepterar tre props:
// - isDescending: Boolean som indikerar om sorteringen är i fallande ordning
// - onFilter: Funktion som triggas för att ändra sorteringsbeteendet när den klickas
// - label: Texten på knappen som visas (t.ex. "Resultat" eller "Datum")
const FilterButton = ({ isDescending, onFilter, label }) => {
  return (
    // Knappelement för filter, triggar onFilter-funktionen när den klickas
    <button className="filter-button" onClick={onFilter}>
      {label}{' '} {/* Visar etiketten som skickas som en prop */}
      
      {/* Villkorsstyrt rendera upp- eller nedpilen baserat på isDescending prop */}
      {isDescending ? (
        // Om isDescending är true, visa upp-pilen (som indikerar fallande ordning)
        <FontAwesomeIcon icon={faSquareCaretUp} className="filter-icon" />
      ) : (
        // Om isDescending är false, visa ned-pilen (som indikerar stigande ordning)
        <FontAwesomeIcon icon={faSquareCaretDown} className="filter-icon" />
      )}
    </button>
  );
};

export default FilterButton; // Exporterar FilterButton-komponenten för användning i andra delar av appen

