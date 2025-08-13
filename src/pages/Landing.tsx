import React from 'react';
import Hero from '../components/landing/Hero';
import Features from '../components/Features';
import Stats from '../components/landing/Stats';
import About from '../components/landing/About';
import Footer from '../components/landing/Footer';

const Landing: React.FC = () => {
  return (
    <div className="landing">
      <Hero />
      <Features />
      <Stats />
      <About />
      <Footer />
    </div>
  );
};

export default Landing; 