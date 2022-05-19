import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import Youtube from './service/youtube';

const root = ReactDOM.createRoot(document.getElementById('root'));
// youtube.js 주입
const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY); // key는 .env 환경파일에서 받아온다.

// 18버전 react라서 ReactDOM.render 지원안함.
root.render(
  <React.StrictMode>
    <App youtube={youtube} />
  </React.StrictMode>
);
