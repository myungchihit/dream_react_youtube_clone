import React, { useState, useEffect } from 'react';
import './app.css';
import VideoList from './components/video_list/video_list';

function App() {

  // 비디오 목록
  const [videos, setVideos] = useState([]);

  // 마운트가 되거나 업데이트 될때 데이터를 받아옴
  // 빈 배열을 준다면, 마운트가 되었을 떄만 useEffect 호출
  useEffect(() => {
    // 유튜브 데이터 받아오기 , postman에서 확인하면서
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://www.googleapis.com/youtube/v3/videos/?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyBibmaM7KTcv56ArgrQPsy4jDUblIOBkeM"
          , requestOptions)
      .then(response => response.json())  // json으로 변환해주자
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error));
  }, []);

  return (
    <VideoList videos={videos}/>
  );
}

export default App;
