import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

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
        <Link to="/home" className="logo-link">
          <div className="mobile_logo">
            <span className="mobile_logo-klimat">Klimat</span>
            <span className="mobile_logo-quizet">Quizet</span>
          </div>
        </Link>
      </div>

      {/* Hidden Links */}
      {links && links.length > 0 && (
        <div id="myLinks" style={{ display: menuOpen ? 'block' : 'none' }}>
          {links.map((link, index) => (
            <Link key={index} to={link.path}>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Right Section: User Icon */}
      <div className="user-icon-container">
        <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
      </div>
    </div>
  );
};

export default MobileNavbar;
