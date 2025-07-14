import React, { useEffect, useRef } from 'react';

const AboutText: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);

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

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <div ref={textRef} className="about-text">
      <h2>About Azelle Group</h2>
      <p>
        Azelle Group is a forward-thinking technology company dedicated to transforming how businesses connect and collaborate. 
        With our innovative solutions, we're bridging the gap between traditional business practices and modern digital needs. 
        Our team of experts combines deep industry knowledge with cutting-edge technology to create seamless, efficient, 
        and user-friendly platforms that empower organizations to thrive in the digital age.
      </p>
    </div>
  );
};

export default AboutText; 