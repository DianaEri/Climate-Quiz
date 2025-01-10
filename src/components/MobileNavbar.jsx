import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const MobileNavbar = ({ links, handleNavigation }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="topnav">
      <div className="nav-left">
        <FontAwesomeIcon icon={faBars} className="icon" onClick={toggleMenu} />
        <div className="mobile_logo">
          <span className="mobile_logo-klimat">Klimat</span>
          <span className="mobile_logo-quizet">Quizet</span>
        </div>
      </div>

      {/* Links */}
      <div id="myLinks" style={{ display: menuOpen ? 'block' : 'none' }}>
        {links && links.map((link, index) => (
          <button
            key={index}
            onClick={() => {
              handleNavigation(link.path); // Trigger navigation on click
              setMenuOpen(false); // Close the menu after clicking
            }}
            className="navbar-link"
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
