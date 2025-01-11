import React from 'react'; // Importerar React för att använda JSX
import recycleIcon from '../assets/logo_climate.svg'; // Importerar bild för logotyp
import kWhiteIcon from '../assets/k_white.svg'; // Importerar bild för "K" ikonen

// Logo-komponenten som visar logotypen för appen
const Logo = () => {
  return (
    <div className="logo-container"> {/* Container för logotypen */}
      <h1 className="logo-klimatet"> {/* Huvudrubrik för "Klimat" */}
        <img src={kWhiteIcon} alt="K" className="logo-k-icon" />limat {/* Visar "K"-ikonen och texten "limat" */}
      </h1>
      <div className="logo-quizet"> {/* Container för "Quizet" texten och ikonen */}
        <span className="logo-quiz">Quizet</span> {/* Texten "Quizet" */}
        <img src={recycleIcon} alt="Recycle Icon" className="logo-icon" /> {/* Återvinningsikonen */}
      </div>
    </div>
  );
};

export default Logo; // Exporterar Logo-komponenten för användning i andra delar av appen

