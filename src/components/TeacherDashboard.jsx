import React, { useState, useEffect } from 'react'; // Importerar React och hooks för hantering av state och effekt
import MobileNavbar from './MobileNavbar'; // Importerar mobilnav-komponenten
import Heading from './Heading'; // Importerar komponent för huvudrubrik
import SubHeading from './SubHeading'; // Importerar komponent för underrubrik
import Table from './Table'; // Importerar tabellkomponenten för att visa data i tabellformat
import RoundButton from './RoundButton'; // Importerar komponent för rund knapp
import GradeButton from './GradeButton'; // Importerar komponent för betygsknapp
import FilterButton from './FilterButton'; // Importerar filterkomponenten för att sortera data
import '../index.css'; // Importerar stilar för komponenterna
import teacherBackground from '../assets/teacher_bg.svg'; // Importerar bakgrundsbild för lärarvy
import SectionHeading from './SectionHeading'; // Importerar komponent för sektionens rubrik
import globe from '../assets/globe.svg'; // Importerar ikon för glob som används i rubriken
import lWhiteIcon from '../assets/l_white.svg'; // Importerar ikon för läraravsnittet

// SVG:er för betygsknappar
const gradeSvgs = {
  7: {
    gradient: `<?xml version="1.0" encoding="utf-8"?><!-- SVG with Gradient -->
    <svg fill="none" width="800px" height="800px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sharedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#bb8e5d;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#77502d;stop-opacity:1" />
        </linearGradient>
      </defs>
      <path d="M208,32H48A16.01833,16.01833,0,0,0,32,48V208a16.01833,16.01833,0,0,0,16,16H208a16.01833,16.01833,0,0,0,16-16V48A16.01833,16.01833,0,0,0,208,32ZM159.58984,86.53027l-32,96a8.0005,8.0005,0,1,1-15.17968-5.06054L140.90039,92H104a8,8,0,0,1,0-16h48a8.00022,8.00022,0,0,1,7.58984,10.53027Z" fill="url(#sharedGradient)" />
    </svg>`,
    monochrome: `<?xml version="1.0" encoding="utf-8"?><!-- Original Monochrome SVG -->
    <svg fill="#000000" width="800px" height="800px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <path d="M208,32H48A16.01833,16.01833,0,0,0,32,48V208a16.01833,16.01833,0,0,0,16,16H208a16.01833,16.01833,0,0,0,16-16V48A16.01833,16.01833,0,0,0,208,32ZM159.58984,86.53027l-32,96a8.0005,8.0005,0,1,1-15.17968-5.06054L140.90039,92H104a8,8,0,0,1,0-16h48a8.00022,8.00022,0,0,1,7.58984,10.53027Z" fill="#8c8c8c"/>
    </svg>`,
  },
  8: {
    gradient: `<?xml version="1.0" encoding="utf-8"?><!-- SVG with Gradient -->
    <svg fill="none" width="800px" height="800px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sharedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#bb8e5d;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#77502d;stop-opacity:1" />
        </linearGradient>
      </defs>
      <path d="M118.09375,111.89063a14,14,0,1,1,19.79687.01562A14.318,14.318,0,0,1,118.09375,111.89063ZM128,132a17.99808,17.99808,0,0,0-12.73438,30.71875,18.43511,18.43511,0,0,0,25.45313.01563A18,18,0,0,0,128,132Zm96-84V208a16.02085,16.02085,0,0,1-16,16H48a16.02085,16.02085,0,0,1-16-16V48A16.02085,16.02085,0,0,1,48,32H208A16.02085,16.02085,0,0,1,224,48ZM162,150a33.71971,33.71971,0,0,0-9.95313-24.03125,30.83637,30.83637,0,0,0-3.12207-2.52148c.08692-.085.19239-.14258.27832-.22852a29.98906,29.98906,0,0,0,.01563-42.42187c-11.32813-11.34375-31.125-11.32813-42.42188-.01563a29.98908,29.98908,0,0,0-.01562,42.42188c.09082.09082.20215.15234.29395.24218a30.89715,30.89715,0,0,0-3.10645,2.50782A33.99637,33.99637,0,1,0,162,150Z" fill="url(#sharedGradient)" />
    </svg>`,
    monochrome: `<?xml version="1.0" encoding="utf-8"?><!-- Original Monochrome SVG -->
    <svg fill="#000000" width="800px" height="800px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <path d="M118.09375,111.89063a14,14,0,1,1,19.79687.01562A14.318,14.318,0,0,1,118.09375,111.89063ZM128,132a17.99808,17.99808,0,0,0-12.73438,30.71875,18.43511,18.43511,0,0,0,25.45313.01563A18,18,0,0,0,128,132Zm96-84V208a16.02085,16.02085,0,0,1-16,16H48a16.02085,16.02085,0,0,1-16-16V48A16.02085,16.02085,0,0,1,48,32H208A16.02085,16.02085,0,0,1,224,48ZM162,150a33.71971,33.71971,0,0,0-9.95313-24.03125,30.83637,30.83637,0,0,0-3.12207-2.52148c.08692-.085.19239-.14258.27832-.22852a29.98906,29.98906,0,0,0,.01563-42.42187c-11.32813-11.34375-31.125-11.32813-42.42188-.01563a29.98908,29.98908,0,0,0-.01562,42.42188c.09082.09082.20215.15234.29395.24218a30.89715,30.89715,0,0,0-3.10645,2.50782A33.99637,33.99637,0,1,0,162,150Z"fill="#8c8c8c" />
    </svg>`,
  },
  9: {
    gradient: `<?xml version="1.0" encoding="utf-8"?><!-- SVG with Gradient -->
    <svg fill="none" width="800px" height="800px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sharedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#bb8e5d;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#77502d;stop-opacity:1" />
        </linearGradient>
      </defs>
      <path d="M148,112a20,20,0,1,1-20-20A20.02229,20.02229,0,0,1,148,112Zm76-64V208a16.01833,16.01833,0,0,1-16,16H48a16.01833,16.01833,0,0,1-16-16V48A16.01833,16.01833,0,0,1,48,32H208A16.01833,16.01833,0,0,1,224,48Zm-60,64a36,36,0,1,0-36,36q.91626,0,1.82129-.04614l-16.68945,27.9436a8.00015,8.00015,0,1,0,13.73632,8.20508l32.249-53.99512c.09668-.16162.178-.32812.262-.49341A35.76746,35.76746,0,0,0,164,112Z" fill="url(#sharedGradient)" />
    </svg>`,
    monochrome: `<?xml version="1.0" encoding="utf-8"?><!-- Original Monochrome SVG -->
    <svg fill="#000000" width="800px" height="800px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <path d="M148,112a20,20,0,1,1-20-20A20.02229,20.02229,0,0,1,148,112Zm76-64V208a16.01833,16.01833,0,0,1-16,16H48a16.01833,16.01833,0,0,1-16-16V48A16.01833,16.01833,0,0,1,48,32H208A16.01833,16.01833,0,0,1,224,48Zm-60,64a36,36,0,1,0-36,36q.91626,0,1.82129-.04614l-16.68945,27.9436a8.00015,8.00015,0,1,0,13.73632,8.20508l32.249-53.99512c.09668-.16162.178-.32812.262-.49341A35.76746,35.76746,0,0,0,164,112Z" fill="#8c8c8c"/>
    </svg>`,
  },
};

// Data för varje årskurs
const gradeData = {
  7: [
    ["Saga Lindberg", "98%", <RoundButton />],
    ["Oliver Ekström", "92%", <RoundButton />],
    ["Emil Andersson", "91%", <RoundButton />],
    ["Ida Sandström", "89%", <RoundButton />],
    ["Amina Al-Badawi", "86%", <RoundButton />],
    ["Viktor Ivanov", "83%", <RoundButton />],
    ["Linnea Dahlgren", "81%", <RoundButton />],
    ["Erik Nyberg", "79%", <RoundButton />],
    ["Omar Al-Fayez", "77%", <RoundButton />],
    ["Elin Öhman", "74%", <RoundButton />],
    ["Freja Norberg", "72%", <RoundButton />],
    ["Axel Sjöberg", "71%", <RoundButton />],
    ["Filip Johansson", "69%", <RoundButton />],
    ["Maja Blomqvist", "67%", <RoundButton />],
    ["Sebastian Holmgren", "66%", <RoundButton />],
    ["Malin Andersson", "64%", <RoundButton />],
    ["Johan Larsson", "62%", <RoundButton />],
    ["Elias Sundqvist", "61%", <RoundButton />],
    ["Klara Forsberg", "59%", <RoundButton />],
    ["Layla Nasser", "57%", <RoundButton />],
    ["Oscar Wallin", "55%", <RoundButton />],
    ["Simon Bergqvist", "53%", <RoundButton />],
    ["Alice Holmberg", "52%", <RoundButton />],
    ["Luka Kovač", "50%", <RoundButton />],
    ["Lovisa Sjögren", "48%", <RoundButton />],
    ["Albin Strömberg", "47%", <RoundButton />],
    ["Khalid Darwish", "45%", <RoundButton />],
    ["Anna Korhonen", "44%", <RoundButton />],
    ["Noel Engman", "43%", <RoundButton />],
    ["Tilda Åkerman", "42%", <RoundButton />],
  ],
  
  8: [
    ["Amir Hassan", "97%", <RoundButton />],
    ["Lina Eriksson", "96%", <RoundButton />],
    ["Elias Karlsson", "94%", <RoundButton />],
    ["Hanna Nyström", "93%", <RoundButton />],
    ["Oskar Johansson", "92%", <RoundButton />],
    ["Fatima Al-Rahman", "91%", <RoundButton />],
    ["Jakob Lindberg", "89%", <RoundButton />],
    ["Mira Sundqvist", "88%", <RoundButton />],
    ["Mohammed Khalil", "87%", <RoundButton />],
    ["Sara Bergström", "86%", <RoundButton />],
    ["Viktor Andersson", "84%", <RoundButton />],
    ["Alva Holm", "83%", <RoundButton />],
    ["Jonas Ek", "81%", <RoundButton />],
    ["Emma Larsson", "79%", <RoundButton />],
    ["Felix Åkerman", "77%", <RoundButton />],
    ["Mariam Fadel", "76%", <RoundButton />],
    ["Axel Sjödin", "74%", <RoundButton />],
    ["Matilda Nygren", "73%", <RoundButton />],
    ["Erik Nord", "71%", <RoundButton />],
    ["Jasmin Salim", "69%", <RoundButton />],
    ["Lukas Håkansson", "68%", <RoundButton />],
    ["Elina Björk", "66%", <RoundButton />],
    ["Noah Lindqvist", "65%", <RoundButton />],
    ["Klara Jönsson", "64%", <RoundButton />],
    ["Ali Osman", "62%", <RoundButton />],
    ["Tove Svensson", "61%", <RoundButton />],
    ["Henrik Wallin", "59%", <RoundButton />],
    ["Nora Hallgren", "57%", <RoundButton />],
    ["William Alström", "55%", <RoundButton />],
    ["Adam Taha", "54%", <RoundButton />],
  ],
  
  9: [
    ["Tarek Ahmad", "95%", <RoundButton />],
    ["Moa Svensson", "94%", <RoundButton />],
    ["Elias Lindgren", "93%", <RoundButton />],
    ["Sofia Bergström", "92%", <RoundButton />],
    ["Omar Al-Fayez", "91%", <RoundButton />],
    ["Hanna Sjöberg", "89%", <RoundButton />],
    ["Fatima Hussein", "88%", <RoundButton />],
    ["Viktor Dahl", "87%", <RoundButton />],
    ["Emma Nyberg", "85%", <RoundButton />],
    ["Amira Khalil", "84%", <RoundButton />],
    ["Jakob Håkansson", "83%", <RoundButton />],
    ["Alva Åström", "81%", <RoundButton />],
    ["Lukas Holmberg", "79%", <RoundButton />],
    ["Matilda Ek", "78%", <RoundButton />],
    ["Mohammed Salim", "77%", <RoundButton />],
    ["Felix Andersson", "75%", <RoundButton />],
    ["Elin Björk", "73%", <RoundButton />],
    ["Klara Larsson", "72%", <RoundButton />],
    ["Noah Svensson", "71%", <RoundButton />],
    ["Ali Osman", "69%", <RoundButton />],
    ["Linnea Jönsson", "68%", <RoundButton />],
    ["Johan Wallin", "67%", <RoundButton />],
    ["Mariam Fadel", "66%", <RoundButton />],
    ["Henrik Karlsson", "64%", <RoundButton />],
    ["Sara Nilsson", "63%", <RoundButton />],
    ["Simon Hallgren", "61%", <RoundButton />],
    ["Freja Lindqvist", "60%", <RoundButton />],
    ["Erik Nyström", "58%", <RoundButton />],
    ["Tove Sandberg", "56%", <RoundButton />],
    ["William Alström", "55%", <RoundButton />],
  ],
  
};

// Lärare Dashboard-komponent
const TeacherDashboard = () => {
  const [activeGrade, setActiveGrade] = useState(7); // Ställ in standardbetyg på 7
  const [rows, setRows] = useState([]); // Rader för tabellen
  const [isDescending, setIsDescending] = useState(true); // Standard sortering av resultat (stigande)
  const [isNameDescending, setIsNameDescending] = useState(true); // Standard sortering av namn (stigande)

  // Sortera rader när betyget eller sorteringsordningen ändras
  useEffect(() => {
    const sortedRows = [...gradeData[activeGrade]].sort((a, b) => {
      const aValue = parseInt(a[1].replace('%', ''), 10); // Extrahera procent från resultatet
      const bValue = parseInt(b[1].replace('%', ''), 10);
      return isDescending ? bValue - aValue : aValue - bValue; // Sortera efter resultat
    });
    setRows(sortedRows); // Uppdatera raderna med sorterat resultat
  }, [activeGrade, isDescending]);

  const handleGradeClick = (grade) => {
    setActiveGrade(grade); // Ändra aktivt betyg
    setIsDescending(true); // Återställ sorteringsordning när betyg ändras
  };

  const handleResultFilter = () => {
    // Sortera resultat efter poäng
    const sortedRows = [...rows].sort((a, b) => {
      const aValue = parseInt(a[1].replace('%', ''), 10);
      const bValue = parseInt(b[1].replace('%', ''), 10);
      return isDescending ? bValue - aValue : aValue - bValue;
    });
    setRows(sortedRows); // Uppdatera rader med sorterade resultat
    setIsDescending(!isDescending); // Växla mellan stigande/ fallande sortering
  };

  const handleNameFilter = () => {
    // Sortera efter namn
    const sortedRows = [...rows].sort((a, b) => {
      const aName = a[0].toLowerCase();
      const bName = b[0].toLowerCase();
      return isNameDescending ? bName.localeCompare(aName) : aName.localeCompare(bName);
    });
    setRows(sortedRows); // Uppdatera rader med sorterade namn
    setIsNameDescending(!isNameDescending); // Växla mellan stigande/ fallande sortering av namn
  };

  const GradeButton = ({ grade, isActive, onClick }) => {
    const svgContent = isActive ? gradeSvgs[grade].gradient : gradeSvgs[grade].monochrome;

    return (
      <button
        className={`grade-button ${isActive ? 'active' : ''}`}
        onClick={onClick}
      >
        <div
          className="grade-svg"
          dangerouslySetInnerHTML={{ __html: svgContent }} // Inkludera SVG för betyg
        />
      </button>
    );
  };

  
  return (
    <div       
      className="teacher-view"
      style={{
        backgroundImage: `url(${teacherBackground})`, // Bakgrundsbild för lärarvyn
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <MobileNavbar /> {/* Navigering för mobilvyn */}
      <div className="teacher-container">
        <SectionHeading
          mainIcon={lWhiteIcon} // Huvudikon för rubriken
          mainText="ärar" // Huvudtext för rubriken
          subText="Hörnan" // Underrubrik
          subIcon={globe} // Underrubrikens ikon
        />
        <Heading text="Student Quiz" /> {/* Rubrik för studentquiz */}
        <SubHeading text="Senaste fem inskickade Quiz" /> {/* Underrubrik för senaste quiz */}

        {/* Första tabellen med studentresultat */}
        <Table
          style={{ paddingBottom: '50px' }}
          headers={["Student", "Resultat", "Quiz"]}
          rows={[ // Data för de senaste studentresultaten
            ["Omar Al-Fayez", "9/13", <RoundButton />],
            ["Maja Blomqvist", "8/13", <RoundButton />],
            ["Sebastian Holmgren", "6/13", <RoundButton />],
            ["Layla Nasser", "5/13", <RoundButton />],
            ["Tilda Åkerman", "7/13", <RoundButton />],
          ]}
        />

        <SubHeading text="Totalt korrekta svar per årskurs" />
        <p className='instruction'>Välj årskurs</p>
        <div className="dynamic-table-wrapper">

          {/* Betygsknappar för att växla mellan olika betyg */}
          <div className="grade-buttons">
            {Object.keys(gradeSvgs).map((grade) => (
              <GradeButton
                key={grade}
                grade={grade}
                isActive={parseInt(grade) === activeGrade}
                onClick={() => handleGradeClick(parseInt(grade))}
              />
            ))}
          </div>

          {/* Filterknappar för att sortera resultaten */}
          <div className="filter-container">
            <SubHeading text="Sortera" />
            <FilterButton
              label="Resultat"
              isDescending={isDescending}
              onFilter={handleResultFilter}
            />
            <FilterButton
              label="Namn"
              isDescending={isNameDescending}
              onFilter={handleNameFilter}
            />
          </div>

          {/* Dynamisk tabell för att visa betyg */}
          <Table
            style={{ paddingBottom: '5px' }}
            headers={["Student", "Resultat", "Besök"]}
            rows={rows.map((row) => [
              row[0],
              row[1],
              row[2], // RoundButton för "Besök"
            ])}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard; // Exportera lärarpanelen för användning i andra delar av appen
