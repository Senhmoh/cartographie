import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p className="loading-text">Chargement...</p>
    </div>
  );
};

export default LoadingSpinner;
