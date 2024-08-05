import React from 'react';
import './CustomTimeInput.css';

const CustomTimeInput = ({ onTimeSubmit, defaultTime, label }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const time = event.target.elements.customTime.value * 60; // Convert minutes to seconds
    onTimeSubmit(time);
  };

  return (
    <form onSubmit={handleSubmit} className={`custom-time-form ${label}`}>
      <input type="number" name="customTime" defaultValue={defaultTime} min="1" max="60" className="custom-time-input" />
      
    </form>
  );
};

export default CustomTimeInput;
