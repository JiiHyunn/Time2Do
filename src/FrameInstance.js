import React, { useState, useRef, useEffect } from 'react';
import './FrameInstance.css';

const FrameInstance = () => {
  const [text, setText] = useState('');
  const textAreaRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  return (
    <div className="memo-parent">
      <div className="memo">memo</div>
      <textarea
        ref={textAreaRef}
        className="if-you-enter"
        value={text}
        onChange={handleChange}
      />
    </div>
  );
};

export default FrameInstance;
