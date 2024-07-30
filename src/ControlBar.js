// ControlBar.js
import React from 'react';
import './ControlBar.css';

const ControlBar = ({ min, max, value, onChange }) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className="control-bar"
    />
  );
};

export default ControlBar;
