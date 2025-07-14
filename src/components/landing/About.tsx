import React from 'react';
import AboutText from './AboutText';
import AboutImage from './AboutImage';

const About: React.FC = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <AboutText />
        <AboutImage />
      </div>
    </section>
  );
};

export default About; 