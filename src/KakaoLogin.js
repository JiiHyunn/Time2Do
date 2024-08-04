import React, { useEffect, useState } from 'react';

const KakaoLogin = ({ onLoginSuccess }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log('Code:', code); // code 값 로그로 확인
    if (code) {
      fetchUserInfo(code);
    }
  }, []);

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
      window.Kakao.init('c0ff6382916f06efdc1b686fc70d74af');
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