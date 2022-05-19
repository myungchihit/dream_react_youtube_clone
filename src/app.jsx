import React, { useState, useEffect } from 'react';
import styles from './app.module.css'
import VideoList from './components/video_list/video_list';
import SearchHeader from './components/search_header/search_header';

// youtube.js 를 파라미터로 받는다.
function App({youtube}) {

  // 비디오 목록
  const [videos, setVideos] = useState([]);

  // 검색 이벤트 search_header에 콜백으로 넘겨줌
  // 유튜브 API로 검색 데이터 조회
  const search = query => {
    youtube.search(query).then(videos => setVideos(videos));
  };

  // 마운트가 되거나 업데이트 될때 데이터를 받아옴
  // 빈 배열을 준다면, 마운트가 되었을 떄만 useEffect 호출
  useEffect(() => {
    youtube.mostPopular() //
      .then(videos => setVideos(videos));
  }, []);

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search}/>
      <VideoList videos={videos}/>
    </div>
  );
}

export default App;
