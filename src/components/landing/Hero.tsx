import React, { useEffect, useRef } from 'react';

const NAVBAR_HEIGHT = 80; // px

const Hero: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('.features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    const elements = [contentRef.current, titleRef.current, subtitleRef.current, buttonRef.current];
    elements.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      elements.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <section className="hero-section">
      <div ref={contentRef} className="hero-content">
        <h1 ref={titleRef} className="hero-title">Let's Connect</h1>
        <p ref={subtitleRef} className="hero-subtitle">Schedule appointments with ease and efficiency</p>
        <button ref={buttonRef} onClick={scrollToFeatures} className="hero-button">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default Hero;