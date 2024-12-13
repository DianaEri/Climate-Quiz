import React from 'react';
import MobileNavbar from './MobileNavbar';
import Heading from './Heading';
import SubHeading from './SubHeading';
import SVGAboveFooter from './SVGAboveFooter';
import Footer from './Footer';

const TeacherDashboard = () => {
  return (
    <div className="teacher-view">
      <MobileNavbar />
      <Heading text="Student Quiz" />
      <SubHeading text="Senaste fem inskickade Quiz" />
      <SVGAboveFooter />
      <Footer />
    </div>
  );
};

export default TeacherDashboard;
