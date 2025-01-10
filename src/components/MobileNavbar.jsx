import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const MobileNavbar = ({ links }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="topnav">
      {/* Left Section: Hamburger Icon and Logo */}
      <div className="nav-left">
        <FontAwesomeIcon icon={faBars} className="icon" onClick={toggleMenu} />
        <div className="mobile_logo">
          <span className="mobile_logo-klimat">Klimat</span>
          <span className="mobile_logo-quizet">Quizet</span>
        </div>
      </div>

      {/* Hidden Links */}
      <div id="myLinks" style={{ display: menuOpen ? 'block' : 'none' }}>
        {links &&
          links.map((link, index) => (
            <a
              key={index}
              onClick={() => {
                link.action(); // Perform the action
                setMenuOpen(false); // Close the menu
              }}
              className="navbar-link"
              href="#"
            >
              {link.label}
            </a>
          ))}
      </div>

      {/* Right Section: User Icon */}
      <div className="user-icon-container">
        <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
      </div>
    </div>
  );
};

export default MobileNavbar;
