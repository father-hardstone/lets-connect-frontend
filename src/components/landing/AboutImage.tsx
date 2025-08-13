import React, { useEffect, useRef } from 'react';

const AboutImage: React.FC = () => {
  const imageRef = useRef<HTMLDivElement>(null);

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

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div ref={imageRef} className="about-image">
      <div className="image-placeholder">
        <img 
          src="/images/vecteezy_portrait-of-young-excited-multiethnics-business-team-of_12534687.jpg"
          alt="Young excited multiethnic business team"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '10px'
          }}
        />
      </div>
    </div>
  );
};

export default AboutImage; 