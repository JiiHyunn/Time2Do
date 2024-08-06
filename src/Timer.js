import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime || 1500); // 기본값 25분
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const calculateProgress = () => {
    const totalTime = 1500; // 25 minutes in seconds
    const progress = (time / totalTime) * 100;
    return progress;
  };

  return (
    <div className="timer-container">
      <div className="timer" onClick={toggleTimer}>
        <svg className="progress-ring" width="300" height="300">
          <circle
            className="progress-ring__circle"
            stroke="#cbbfbf"
            strokeWidth="20"
            fill="transparent"
            r="140"
            cx="150"
            cy="150"
            strokeLinecap="round"
          />
          <circle
            className="progress-ring__circle--progress"
            stroke="#585151"
            strokeWidth="20"
            fill="transparent"
            r="140"
            cx="150"
            cy="150"
            strokeDasharray="880"
            strokeDashoffset={(880 * (1500 - time)) / 1500}
            strokeLinecap="round"
          />
        </svg>
        <div className="timer-text">{formatTime(time)}</div>
      </div>
    </div>
  );
};

export default Timer;