import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="features">
      <h2>How It Works</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <h3>Create Your Schedule</h3>
          <p>Set up your availability and let others book appointments with you at their convenience.</p>
        </div>
        <div className="feature-card">
          <h3>Easy Booking</h3>
          <p>Clients can view your availability and book appointments instantly, with automatic confirmations.</p>
        </div>
        <div className="feature-card">
          <h3>Smart Management</h3>
          <p>Keep track of all your appointments, send reminders, and manage your schedule effortlessly.</p>
        </div>
      </div>
    </section>
  );
};

export default Features; 