import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import {
  faUser,
  faMessage,
  faBell,
} from '@fortawesome/free-regular-svg-icons';
import SVGAboveFooter from './SVGAboveFooter';

const Footer = () => {
  return (
    <div className="footer-container">
      {/* SVG Above Footer */}
      <div className="svg-wrapper">
        <SVGAboveFooter />
      </div>

      {/* Footer Content */}
      <div className="footer">
        {/* Row 1: Icons */}
        <div className="footer-icons">
          <div className="icon-text-column">
            <FontAwesomeIcon icon={faHouse} className="footer-icon" />
            <span className="footer-label">Hem</span>
          </div>
          <div className="icon-text-column">
            <FontAwesomeIcon icon={faUser} className="footer-icon" />
            <span className="footer-label">Vänner</span>
          </div>
          <div className="icon-text-column">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="footer-icon" />
            <span className="footer-label">Sök</span>
          </div>
          <div className="icon-text-column">
            <FontAwesomeIcon icon={faMessage} className="footer-icon" />
            <span className="footer-label">Chatt</span>
          </div>
          <div className="icon-text-column bell-icon-container">
            <FontAwesomeIcon icon={faBell} className="footer-icon" />
            <span className="footer-label">Inkorg</span>
            <span className="bell-notification-dot"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

