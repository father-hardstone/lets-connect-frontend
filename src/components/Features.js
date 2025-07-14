import React, { useEffect, useRef } from 'react';

const Features = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

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

    const elements = [sectionRef.current, titleRef.current, cardsRef.current];
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

  const features = [
    {
      title: 'Connect with Professionals',
      description: 'Build meaningful connections with industry experts and like-minded professionals in your field.'
    },
    {
      title: 'Share Your Expertise',
      description: 'Showcase your skills and experience through a professional profile that highlights your achievements.'
    },
    {
      title: 'Discover Opportunities',
      description: 'Find new career opportunities, collaborations, and projects that match your interests and expertise.'
    }
  ];

  return (
    <section ref={sectionRef} className="features">
      <h2 ref={titleRef} className="features-title">Why Choose Let's Connect?</h2>
      <div ref={cardsRef} className="feature-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features; 