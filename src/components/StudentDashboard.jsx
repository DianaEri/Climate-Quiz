import React from 'react';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';
import MobileNavbar from './MobileNavbar';
import PillButton from './PillButton';
import SVGAboveFooter from './SVGAboveFooter';
import Footer from './Footer';

const StudentDashboard = () => {
  return (
    <div className="student-view">
      <MobileNavbar />
      <div className="dashboard-parent">
        <div className="dashboard-container">
          <PillButton
            text="Veckans Quiz"
            icon={faCircleUp}
            onClick={() => console.log('Veckans Quiz')}
          />
          <PillButton
            text="Färdiga Quiz"
            icon={faCircleUp}
            onClick={() => console.log('Färdiga Quiz')}
          />
          <PillButton
            text="Total rankning"
            icon={faCircleUp}
            onClick={() => console.log('Total rankning')}
          />
        </div>
      </div>
      <SVGAboveFooter />
      <Footer />
    </div>
  );
};

export default StudentDashboard;
