import React, { useState } from 'react';
import './Modal.css';
import loginImage from './img/loginImage.png';

const Modal = ({ show, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    onLoginSuccess({ nickname: username }); // 사용자 정보 설정
    onClose(); 
  };

  const handleImageClick = () => {
    window.location.href = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=dcd3ebb2733d21881a04e38a07603869&redirect_uri=http://localhost:3000/kakao/callback';
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Login</button>
        </form>
        <img src={loginImage} alt="Login" className="login-image" onClick={handleImageClick} />
      </div>
    </div>
  );
};

export default Modal;
