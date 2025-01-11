import React, { useState, useEffect } from "react";

// Importera alla bakgrundsbilder
import quiz_bg1 from "../assets/quiz_bg1.png";
import quiz_bg2 from "../assets/quiz_bg2.png";
import quiz_bg3 from "../assets/quiz_bg3.png";
import quiz_bg4 from "../assets/quiz_bg4.png";
import quiz_bg5 from "../assets/quiz_bg5.png";
import quiz_bg6 from "../assets/quiz_bg6.png";
import quiz_bg7 from "../assets/quiz_bg7.png";
import quiz_bg8 from "../assets/quiz_bg8.png";
import quiz_bg9 from "../assets/quiz_bg9.png";
import quiz_bg10 from "../assets/quiz_bg10.png";
import quiz_bg11 from "../assets/quiz_bg11.png";
import quiz_bg12 from "../assets/quiz_bg12.png";
import quiz_bg13 from "../assets/quiz_bg13.png";
import quiz_bg14 from "../assets/quiz_bg14.png";

// Lista av alla bakgrundsbilder
const backgrounds = [
  quiz_bg1, quiz_bg2, quiz_bg3, quiz_bg4, quiz_bg5,
  quiz_bg6, quiz_bg7, quiz_bg8, quiz_bg9, quiz_bg10,
  quiz_bg11, quiz_bg12, quiz_bg13, quiz_bg14
];

const QuizBackground = ({ currentQuestion }) => {
  const [currentBackground, setCurrentBackground] = useState(backgrounds[0]); // Sätter initial bakgrund till den första i listan

  // Förladdar bilder vid komponentens montering
  useEffect(() => {
    backgrounds.forEach((bg) => {
      const img = new Image();
      img.src = bg; // Laddar varje bakgrundsbild
    });
  }, []); // Kör bara vid första renderingen (montering)

  useEffect(() => {
    // Byt bakgrund när frågan ändras
    const backgroundIndex = Math.min(currentQuestion, backgrounds.length - 1); // Säkerställ att indexet inte är utanför arrayens längd
    setCurrentBackground(backgrounds[backgroundIndex]); // Uppdatera bakgrunden
  }, [currentQuestion]); // När currentQuestion ändras, uppdatera bakgrunden

  return (
    <div
      style={{
        position: "fixed", // Fäst bakgrunden på hela sidan
        top: 0,
        left: 0,
        width: "100vw", // Full bredd på skärmen
        height: "100vh", // Full höjd på skärmen
        backgroundImage: `url(${currentBackground})`, // Sätt den nuvarande bakgrunden
        backgroundSize: "cover", // Gör så att bakgrunden täcker hela ytan
        backgroundPosition: "center", // Centrera bakgrunden
        zIndex: -1, // Sätt z-index så att den ligger bakom quizinnehållet
        transition: "background-image 0.5s ease-in-out", // Lägger till en mjuk övergång för bakgrundsbytet
      }}
    />
  );
};

export default QuizBackground; // Exportera QuizBackground-komponenten för användning i andra delar av appen
