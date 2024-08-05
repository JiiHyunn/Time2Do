import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const KakaoLogin = ({ onLoginSuccess }) => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    //const code = new URL(window.location.href).searchParams.get('code');
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code) {
      console.log('Code:', code); // code 값 로그로 확인
      fetchUserInfo(code);
    }
  }, [location.search]);

  const fetchUserInfo = (code) => {
    const url = new URL('http://localhost:8080/kakao/callback');
    url.searchParams.append('code', code);

    console.log('Sending request to:', url.toString()); // 요청 URL 로그

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('Response received:', res); // 응답 로그
        return res.json();
      })
      .then((data) => {
        console.log('Data received:', data); // 데이터 로그
        setUser(data.user.kakao_account.profile);
        localStorage.setItem('kakaoToken', data.access_token);
        onLoginSuccess(data.user.kakao_account.profile);
      })
      .catch((error) => {
        console.error('Error:', error); // 에러 로그
      });
  };

  const handleLogin = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('6c5a26c3f4532c47409caacef2f1b67b');
    }
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/kakao/callback',
    });
  };

  return (
    <div>
      {user && <div className="user-info">{user.nickname}님 환영합니다!</div>}
      <button onClick={handleLogin}>Kakao Login</button>
    </div>
  );
};

export default KakaoLogin;
