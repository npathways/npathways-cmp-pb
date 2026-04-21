import React from 'react';
import './App.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oops! Path Not Found</h2>
        <p className="not-found-text">
          It looks like you've wandered off the strategic pathway. 
          Let's get you back on track to your future success.
        </p>
        <button 
          className="btn-book"
          onClick={() => window.location.href = '/'}
        >
          Back to Global Excellence
        </button>
      </div>
      <div className="not-found-visual">
        {/* Abstract visual or illustration can go here */}
      </div>
    </div>
  );
};

export default NotFound;
