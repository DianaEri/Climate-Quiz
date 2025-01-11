import React, { useState, useEffect, useRef } from 'react'; // Importerar React och nödvändiga hooks för att hantera state och ref
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importerar FontAwesomeIcon för att använda ikoner
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Importerar ikoner för hamburgermenyn och användarikonen

// MobileNavbar-komponenten som hanterar mobilnavigation
const MobileNavbar = ({ links, handleNavigation }) => {
  const [menuOpen, setMenuOpen] = useState(false); // State för att hålla reda på om menyn är öppen eller stängd
  const menuRef = useRef(null); // Ref för att referera till menyn

  // Funktion för att växla mellan öppen/stängd meny
  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Växlar mellan true/false för att öppna/stänga menyn
  };

  // Funktion för att hantera när en länk klickas, navigerar till den specifika sidan
  const handleLinkClick = (path) => {
    handleNavigation(path); // Anropar handleNavigation för att navigera till den valda vägen
    setMenuOpen(false); // Stänger menyn efter att en länk klickats
  };

  // Funktion för att hantera klick utanför menyn för att stänga menyn
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) { // Kollar om klicket var utanför menyn
      setMenuOpen(false); // Stänger menyn om det var ett klick utanför
    }
  };

  // Lägg till event listener för att stänga menyn om användaren klickar utanför
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // Lyssnar på klick utanför
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Tar bort event listener när komponenten tas bort
    };
  }, []); // Kör bara när komponenten först renderas

  return (
    <div className="topnav">
      <div className="nav-left">
        <FontAwesomeIcon icon={faBars} className="icon" onClick={toggleMenu} />
        <div className="mobile_logo">
          <span className="mobile_logo-klimat">Klimat</span>
          <span className="mobile_logo-quizet">Quizet</span>
        </div>
      </div>

      {/* Länkar i menyn */}
      <div 
        id="myLinks" 
        ref={menuRef} 
        style={{ display: menuOpen ? 'block' : 'none' }}
      >
        {links && links.map((link, index) => (
          <button
            key={index}
            onClick={() => handleLinkClick(link.path)}
            className="navbar-link"
            aria-label={link.label}
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="user-icon-container">
        <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
      </div>
    </div>
  );
};

export default MobileNavbar;
