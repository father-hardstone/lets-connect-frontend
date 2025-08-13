import React, { useEffect, useRef, useState } from 'react';

interface Counts {
  clients: number;
  years: number;
  projects: number;
  satisfaction: number;
}

const Stats = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const [counts, setCounts] = useState<Counts>({
    clients: 0,
    years: 0,
    projects: 0,
    satisfaction: 0
  });

  const stats = [
    {
      number: 200,
      label: 'Active Clients',
      key: 'clients'
    },
    {
      number: 3,
      label: 'Years Experience',
      key: 'years'
    },
    {
      number: 1600,
      label: 'Appointments Completed',
      key: 'projects'
    },
    {
      number: 98,
      label: 'Client Satisfaction',
      key: 'satisfaction'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Start counting animation when section becomes visible
            if (entry.target === sectionRef.current) {
              animateCounts();
            }
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

    const elements = [sectionRef.current, titleRef.current, gridRef.current];
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

  const animateCounts = () => {
    const duration = 900; // 0.7 seconds
    const steps = 80;

    stats.forEach((stat) => {
      let current = 0;
      const startTime = Date.now();
      
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function: ease-out (starts fast, slows down)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        current = stat.number * easedProgress;
        
        if (progress >= 1) {
          current = stat.number;
          clearInterval(timer);
        }
        
        setCounts(prev => ({
          ...prev,
          [stat.key as keyof Counts]: Math.floor(current)
        }));
      }, 16); // ~60fps for smooth animation
    });
  };

  return (
    <section ref={sectionRef} className="stats">
      <h2 ref={titleRef} className="stats-title">Our Achievements</h2>
      <div ref={gridRef} className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-number">
              {stat.key === 'satisfaction' ? `${counts[stat.key as keyof Counts]}%` : counts[stat.key as keyof Counts].toLocaleString()}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats; 