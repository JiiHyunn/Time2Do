import React, { useState } from 'react';
import './Modal.css';
import loginImage from './img/loginImage.png';

const Modal = ({ show, onClose, user, onLogout, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adConsent, setAdConsent] = useState(false);
  const [signup, setSignup] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    onLoginSuccess({ nickname: username }); // 사용자 정보 설정
    onClose();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log('Sign up:', { username, password, email, adConsent });
    // 회원가입 로직 추가
    setSignup(false); // 회원가입 완료 후 로그인 화면으로 이동
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
            <h2>{signup ? 'Sign Up' : 'Login'}</h2>
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
                  비밀번호 확인:
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="비밀번호를 다시 입력하세요."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
            {!signup && (
              <img src={loginImage} alt="Login" className="login-image" onClick={handleImageClick} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
