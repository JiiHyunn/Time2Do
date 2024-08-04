import React, { useState } from 'react';
import './Modal.css';
import loginImage from './img/loginImage.png';

const Modal = ({ show, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // 이메일 상태 추가
  const [adConsent, setAdConsent] = useState(false); // 광고 수신 동의 상태 추가
  const [isSignUp, setIsSignUp] = useState(false); // 회원가입 모드인지 여부

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    onLoginSuccess({ nickname: username }); // 사용자 정보 설정
    onClose(); 
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // 회원가입 로직 구현
    console.log('Sign Up - Username:', username);
    console.log('Sign Up - Password:', password);
    console.log('Sign Up - Email:', email);
    console.log('Sign Up - Ad Consent:', adConsent);
    // 회원가입 성공 시 로그인과 동일하게 처리
    onLoginSuccess({ nickname: username });
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
        {isSignUp ? (
          <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <label>
                ID:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <button type="button">Check ID</button> {/* 아이디 중복 확인 버튼 */}
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={email} // 이메일 값 설정
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={adConsent} // 광고 수신 동의 값 설정
                  onChange={(e) => setAdConsent(e.target.checked)}
                />
                I agree to receive advertisements
              </label>
              <button type="submit">Sign Up</button>
            </form>
            <button onClick={() => setIsSignUp(false)}>Already have an account? Log In</button>
          </div>
        ) : (
          <div>
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
            <button onClick={() => setIsSignUp(true)}>Sign Up</button> {/* 회원가입 버튼 */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
