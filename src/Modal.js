import React from 'react';
import './Modal.css';
import loginImage from './img/loginImage.png';

const Modal = ({ show, onClose, user, onLogout }) => {
  const handleImageClick = () => {
    window.location.href = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=9dac5fed462a679bb95d052f9fc5a549&redirect_uri=https://jiihyunn.github.io/Time2Do/';
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
        {user ? (
          <>
            <h2>로그아웃</h2>
            <p>{user.nickname}님, 로그아웃 하시겠습니까?</p>
            <button onClick={onLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <h2>카카오 로그인</h2>
            <img src={loginImage} alt="Login" className="login-image" onClick={handleImageClick} />
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
