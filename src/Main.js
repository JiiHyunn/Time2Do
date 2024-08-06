import './Main.css';
import './global.css';
import { useEffect, useState, useRef } from 'react';
import Modal from './Modal';
import ToDoList from './ToDoList';
import Timer from './Timer';
import FrameInstance from './FrameInstance';
import KakaoLogin from './KakaoLogin';
import img1 from './img/img1.png';
import img2 from './img/img2.png';
import img3 from './img/img3.png';
import img4 from './img/img4.png';
import img5 from './img/img5.png';
import img7 from './img/img7.png';
import TimerSetting from './img/TimerSetting.png';
import CustomTimeInput from './CustomTimeInput'; // CustomTimeInput 추가
import Timerbutton from './img/Timerbutton.png';
import Timerbutton2 from './img/Timerbutton2.png';
import Timerbutton3 from './img/Timerbutton3.png';
import rainSound from './music/내가 들으려고 만든 잠드는 빗소리 1시간버전 1분후 검은화면.mp3';
import lightImg from './img/light.png'; // 추가
import soundImg from './img/sound.png'; // 추가

const Main = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(100);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [img2Visible, setImg2Visible] = useState(false);
  const [showToDoList, setShowToDoList] = useState(false);
  const [showMemo, setShowMemo] = useState(false);
  const [user, setUser] = useState(null);
  const [timerKey, setTimerKey] = useState(Date.now());
  const [timerTime, setTimerTime] = useState(1500);
  const [toDoListHeight, setToDoListHeight] = useState(0);
  const [studySession, setStudySession] = useState(1);
  const [customTimes, setCustomTimes] = useState([25 * 60, 5 * 60, 15 * 60]); // 기본값: 25분, 5분, 15분
  const [currentPhase, setCurrentPhase] = useState(0); // 현재 타이머의 단계
  const audioRef = useRef(null);
  const rainAudioRef = useRef(null);

  useEffect(() => {
    document.body.style.zoom = '90%';

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'P.M.' : 'A.M.';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[date.getDay()];
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let dayOfMonth = String(date.getDate()).padStart(2, '0');
    return `${month}.${dayOfMonth} ${day}`;
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleBrightnessChange = (event) => {
    setBrightness(event.target.value);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = event.target.value / 100;
    }
    if (rainAudioRef.current) {
      rainAudioRef.current.volume = event.target.value / 100;
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleImg2 = () => {
    setImg2Visible(!img2Visible);
  };

  const toggleToDoList = () => {
    setShowToDoList(!showToDoList);
  };

  const toggleMemo = () => {
    setShowMemo(!showMemo);
  };

  const toggleRainSound = () => {
    if (rainAudioRef.current.paused) {
      rainAudioRef.current.play();
    } else {
      rainAudioRef.current.pause();
    }
  };

  const handleTimerReset = (time) => {
    setTimerTime(time);
    setTimerKey(Date.now());
    setImg2Visible(false);
  };

  const handleCycleComplete = () => {
    setCurrentPhase((prevPhase) => {
      const nextPhase = (prevPhase + 1) % customTimes.length;
      if (nextPhase === 0) {
        setStudySession((prevSession) => prevSession + 1);
      }
      return nextPhase;
    });
  };

  const handleCustomTimeSubmit = (index, time) => {
    const newCustomTimes = [...customTimes];
    newCustomTimes[index] = time;
    setCustomTimes(newCustomTimes);
    if (index === 0) {
      handleTimerReset(time);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setShowModal(false);
  };

  useEffect(() => {
    handleTimerReset(customTimes[currentPhase]);
  }, [currentPhase, customTimes]);

  const memoContainerTop = showToDoList
    ? `calc(186px + ${toDoListHeight}px + 35px)`
    : `calc(134px + 30px + 30px)`; // icon1-container 위치 + 35px 간격

  return (
    <div className="main" style={{ filter: `brightness(${brightness}%)` }}>
      <div className="main-child" />
      <div className="line-parent">
        <div className="group-child" />
        <div className="group-item" />
        <div className="group-inner" />
      </div>
      <div className="div" onClick={toggleDropdown}>
        <div className="child" />
        <div className="div1">
          <div className="item" />
          <div className="inner" />
          <div className="rectangle-div" />
        </div>
      </div>
      <div className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`} onClick={toggleDropdown}>
        <img src={img1} alt="img1" />
        <img src={img2} alt="img2" onClick={toggleImg2} />
        <img src={img3} alt="img3" onClick={toggleToDoList} />
        <img src={img4} alt="img4" onClick={toggleMemo} />
        <img src={img5} alt="img5" onClick={toggleRainSound} />
        <img src={img7} alt="img7" onClick={() => document.documentElement.requestFullscreen()} />
      </div>
      {showToDoList && <ToDoList onHeightChange={setToDoListHeight} />}
      {showMemo && (
        <div className={showToDoList ? 'memo-container' : 'memo-container-below-div3'} style={{ top: memoContainerTop }}>
          <FrameInstance />
        </div>
      )}
      <div className="div3">
        <div className="friday">{formatDate(currentTime)}</div>
        <div className="div4">
          <b className="friday">{formatTime(currentTime)}</b>
        </div>
        <div className="div5" onClick={toggleModal}>
          {user ? (
            <div>
              <img src={user.profileImage} alt="Profile" className="profile-image" />
              <span>{user.nickname}</span>
            </div>
          ) : (
            <b className="login">Login</b>
          )}
        </div>
      </div>
      <div className="cool-with-you">ASMR - Rain Sound</div>
      <div className="div6">
        {img2Visible ? (
          <div className="overlay-container">
          <img src={TimerSetting} alt="img2-overlay" className="overlay-img" />
          <CustomTimeInput onTimeSubmit={(time) => handleCustomTimeSubmit(0, time)} defaultTime={customTimes[0] / 60} label="form1" />
          <CustomTimeInput onTimeSubmit={(time) => handleCustomTimeSubmit(1, time)} defaultTime={customTimes[1] / 60} label="form2" />
          <CustomTimeInput onTimeSubmit={(time) => handleCustomTimeSubmit(2, time)} defaultTime={customTimes[2] / 60} label="form3" />
        </div>
        ) : (
          <Timer key={timerKey} initialTime={timerTime} onCycleComplete={handleCycleComplete} />
        )}
      </div>
      <div className="study-session">
        <div className="study-session-1">&lt;study session {studySession}&gt;</div>
      </div>
      <div className="icon-container">
        <input
          type="range"
          min="0"
          max="100"
          value={brightness}
          onChange={handleBrightnessChange}
          className="brightness-slider"
        />
        <img src={lightImg} alt="Light" className="icon-light" /> {/* 추가된 부분 */}
      </div>
      <div className="icon1-container">
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
        <img src={soundImg} alt="Sound" className="icon-sound" /> {/* 추가된 부분 */}
      </div>
      <audio ref={audioRef} src="your-audio-file.mp3" autoPlay loop />
      <audio ref={rainAudioRef} src={rainSound} loop />
      <Modal show={showModal} onClose={toggleModal} user={user} onLogout={handleLogout} onLoginSuccess={setUser} />
      <KakaoLogin onLoginSuccess={setUser} />
    </div>
  );
};

export default Main;
