import React from 'react';
import './App.css';

const LoadingScreen = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader-content">
        <div className="loader-logo">NPATHWAYS</div>
        <div className="loader-bar">
          <div className="loader-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
