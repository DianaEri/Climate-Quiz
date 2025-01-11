import React from 'react'; // Importerar React-biblioteket för att använda JSX
import PropTypes from 'prop-types'; // Importerar PropTypes för att definiera och validera komponentens props

// Heading-komponenten används för att skapa en rubrik med texten som skickas in som prop
// Den tar emot en prop:
// - text: Texten som ska visas i rubriken
const Heading = ({ text }) => {
  return <h1 className="heading">{text}</h1>; // Returnerar en h1-tag med den angivna texten
};

// Definierar prop-typer för Heading-komponenten
// Text-propen är obligatorisk och ska vara en sträng
Heading.propTypes = {
  text: PropTypes.string.isRequired, // Text måste vara en sträng och den är obligatorisk
};

export default Heading; // Exporterar Heading-komponenten så att den kan användas i andra delar av appen
