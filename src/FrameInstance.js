import React, { useState } from 'react';
import './FrameInstance.css';

const FrameInstance = () => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="memo-parent">
      <div className="memo">memo</div>
      <textarea
        className="if-you-enter"
        placeholder="If you enter more text, the box will expand. Please try."
        value={text}
        onChange={handleChange}
      />
    </div>
  );
};

export default FrameInstance;
