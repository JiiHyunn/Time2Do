import React, { useState } from 'react';
import './Modal.css';
import loginImage from './img/loginImage.png';

const Modal = ({ show, onClose, onLoginSuccess, user, onLogout }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [adConsent, setAdConsent] = useState(false);
  const [signup, setSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser && storedUser.password === password) {
      onLoginSuccess({ nickname: username }); // 사용자 정보 설정
      setErrorMessage('');
      onClose();
    } else {
      setErrorMessage('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (localStorage.getItem(username)) {
      setErrorMessage('이미 존재하는 아이디입니다.');
    } else {
      localStorage.setItem(username, JSON.stringify({ password, email, adConsent }));
      setSignup(false); // 회원가입 완료 후 로그인 화면으로 이동
      setErrorMessage('');
    }
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
        {user ? (
          <>
            <h2>로그아웃</h2>
            <p>{user.nickname}님, 로그아웃 하시겠습니까?</p>
            <button onClick={onLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <h2>{signup ? '회원가입' : '로그인'}</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {signup ? (
              <form onSubmit={handleSignup}>
                <label>
                  아이디:
                  <input
                    type="text"
                    name="username"
                    placeholder="아이디를 입력하세요."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
                <label>
                  비밀번호:
                  <input
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력하세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <label>
                  이메일:
                  <input
                    type="email"
                    name="email"
                    placeholder="이메일을 입력하세요."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label>
                  광고 수신 동의:
                  <input
                    type="checkbox"
                    checked={adConsent}
                    onChange={(e) => setAdConsent(e.target.checked)}
                  />
                </label>
                <button type="submit">회원가입</button>
                <button type="button" onClick={() => setSignup(false)}>로그인 화면으로</button>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <label>
                  아이디:
                  <input
                    type="text"
                    name="username"
                    placeholder="아이디를 입력하세요."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
                <label>
                  비밀번호:
                  <input
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력하세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <button type="submit">로그인</button>
                <button type="button" onClick={() => setSignup(true)}>회원가입</button>
              </form>
            )}
            <img src={loginImage} alt="Login" className="login-image" onClick={handleImageClick} />
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
