import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const MobileNavbar = ({ links, handleNavigation }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = (path) => {
    handleNavigation(path); // Trigger the navigation
    setMenuOpen(false); // Close the menu after clicking a link
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  // Add event listener for clicking outside the menu
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      <div 
        id="myLinks" 
        ref={menuRef} 
        style={{ display: menuOpen ? 'block' : 'none' }}
      >
        {links && links.map((link, index) => (
          <button
            key={index}
            onClick={() => handleLinkClick(link.path)} // Use handleLinkClick
            className="navbar-link"
            aria-label={link.label} // Accessibility
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
