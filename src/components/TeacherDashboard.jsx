import React, { useState } from 'react';
import MobileNavbar from './MobileNavbar';
import Heading from './Heading';
import SubHeading from './SubHeading';
import Table from './Table';
import RoundButton from './RoundButton';
import GradeButton from './GradeButton';
import FilterButton from './FilterButton';
import Footer from './Footer';

// SVGs for Grade Buttons
const gradeSvgs = {
  7: `<?xml version="1.0" encoding="utf-8"?><!-- SVG for Grade 7 -->
  <svg fill="#000000" width="800px" height="800px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <path d="M208,32H48A16.01833,16.01833,0,0,0,32,48V208a16.01833,16.01833,0,0,0,16,16H208a16.01833,16.01833,0,0,0,16-16V48A16.01833,16.01833,0,0,0,208,32ZM159.58984,86.53027l-32,96a8.0005,8.0005,0,1,1-15.17968-5.06054L140.90039,92H104a8,8,0,0,1,0-16h48a8.00022,8.00022,0,0,1,7.58984,10.53027Z"/>
  </svg>`,
  8: `<?xml version="1.0" encoding="utf-8"?><!-- SVG for Grade 8 -->
  <svg fill="#000000" width="800px" height="800px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <path d="M118.09375,111.89063a14,14,0,1,1,19.79687.01562A14.318,14.318,0,0,1,118.09375,111.89063ZM128,132a17.99808,17.99808,0,0,0-12.73438,30.71875,18.43511,18.43511,0,0,0,25.45313.01563A18,18,0,0,0,128,132Zm96-84V208a16.02085,16.02085,0,0,1-16,16H48a16.02085,16.02085,0,0,1-16-16V48A16.02085,16.02085,0,0,1,48,32H208A16.02085,16.02085,0,0,1,224,48ZM162,150a33.71971,33.71971,0,0,0-9.95313-24.03125,30.83637,30.83637,0,0,0-3.12207-2.52148c.08692-.085.19239-.14258.27832-.22852a29.98906,29.98906,0,0,0,.01563-42.42187c-11.32813-11.34375-31.125-11.32813-42.42188-.01563a29.98908,29.98908,0,0,0-.01562,42.42188c.09082.09082.20215.15234.29395.24218a30.89715,30.89715,0,0,0-3.10645,2.50782A33.99637,33.99637,0,1,0,162,150Z"/>
  </svg>`,
  9: `<?xml version="1.0" encoding="utf-8"?><!-- SVG for Grade 9 -->
  <svg fill="#000000" width="800px" height="800px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <path d="M148,112a20,20,0,1,1-20-20A20.02229,20.02229,0,0,1,148,112Zm76-64V208a16.01833,16.01833,0,0,1-16,16H48a16.01833,16.01833,0,0,1-16-16V48A16.01833,16.01833,0,0,1,48,32H208A16.01833,16.01833,0,0,1,224,48Zm-60,64a36,36,0,1,0-36,36q.91626,0,1.82129-.04614l-16.68945,27.9436a8.00015,8.00015,0,1,0,13.73632,8.20508l32.249-53.99512c.09668-.16162.178-.32812.262-.49341A35.76746,35.76746,0,0,0,164,112Z"/>
  </svg>`,
};

// Data for Each Grade
const gradeData = {
  7: [
    ["Saga Lindberg", "98%", <RoundButton />],
    ["Oliver Ekström", "92%", <RoundButton />],
    ["Emil Andersson", "91%", <RoundButton />],
    // Add more rows for grade 7...
  ],
  8: [
    ["Amir Hassan", "97%", <RoundButton />],
    ["Lina Eriksson", "96%", <RoundButton />],
    // Add more rows for grade 8...
  ],
  9: [
    ["Tarek Ahmad", "95%", <RoundButton />],
    ["Moa Svensson", "94%", <RoundButton />],
    // Add more rows for grade 9...
  ],
};

const TeacherDashboard = () => {
  const [activeGrade, setActiveGrade] = useState(7); // Default Grade 7
  const [rows, setRows] = useState(gradeData[7]);
  const [isDescending, setIsDescending] = useState(true); // Default Descending Order

  const handleGradeClick = (grade) => {
    setActiveGrade(grade);
    setRows(gradeData[grade]);
  };

  const handleFilter = () => {
    const sortedRows = [...rows].sort((a, b) => {
      // Extract numeric values from percentage strings
      const aValue = parseInt(a[1].replace('%', ''), 10); // Remove "%" and parse as integer
      const bValue = parseInt(b[1].replace('%', ''), 10); // Remove "%" and parse as integer
  
      return isDescending ? bValue - aValue : aValue - bValue; // Sort based on ascending/descending order
    });
  
    setRows(sortedRows);
    setIsDescending(!isDescending); // Toggle sorting order
  };

  return (
    <div className="teacher-view">
      <MobileNavbar />
      <Heading text="Student Quiz" />
      <SubHeading text="Senaste fem inskickade Quiz" />

      {/* First Table */}
      <Table
        headers={["Student", "Resultat", "Quiz"]}
        rows={[
          ["Omar Al-Fayez", "9/13", <RoundButton />],
          ["Maja Blomqvist", "8/13", <RoundButton />],
          ["Sebastian Holmgren", "6/13", <RoundButton />],
          ["Layla Nasser", "5/13", <RoundButton />],
          ["Tilda Åkerman", "7/13", <RoundButton />],
        ]}
      />

      <SubHeading text="Totalt korrekta svar per årskurs" />

      {/* Grade Buttons */}
      <div className="grade-buttons">
        {Object.keys(gradeSvgs).map((grade) => (
          <GradeButton
            key={grade}
            svg={gradeSvgs[grade]}
            isActive={parseInt(grade) === activeGrade}
            onClick={() => handleGradeClick(parseInt(grade))}
          />
        ))}
      </div>

      {/* Filter Button */}
      <div className="filter-container">
        <FilterButton onFilter={handleFilter} />
      </div>

      {/* Dynamic Table for Grades */}
      <Table
        headers={["Student", "Resultat", "Besök"]}
        rows={rows.map((row) => [
          row[0],
          row[1],
          row[2], // RoundButton for "Besök"
        ])}
      />

      <Footer />
    </div>
  );
};

export default TeacherDashboard;
