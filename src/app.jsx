import React, { useState, useEffect, useCallback } from 'react';
import styles from './app.module.css'
import VideoList from './components/video_list/video_list';
import SearchHeader from './components/search_header/search_header';
import VideoDetail from './components/video_detail/video_detail';

// youtube.js 를 파라미터로 받는다.
function App({youtube}) {

  // 비디오 목록
  const [videos, setVideos] = useState([]);

  // 선택된 동영상
  const [selectedVideo, setSelectedVideo] = useState(null);

  // 선택된 비디오 이벤트
  const selectVideo = (video) => {
    setSelectedVideo(video);
  }

  // 검색 이벤트 search_header에 콜백으로 넘겨줌
  // 유튜브 API로 검색 데이터 조회
  // useCallback을 쓰는이유: component가 함수이기 때문에 App이 계속 호출이된다.
  // 때문에 useCallback을 안쓸경우 props이 계속 바껴서 header가 계속 렌더링이 된다.
  // 뒤에 비어있는 배열을 집어넣어줘야 동일한 오브젝트를 계속 사용하게된다.
  // useCallback은 조심히 써야함, 한번 쓰면 메모리에 계속 남기 때문이다.
  // --> 자식 컴포넌트에 props로 전달할 경우에만 useCallback을 사용해야된다. 아니면 리렌더링이 계속 되기때문.
  const search = useCallback(  
    query => {
      setSelectedVideo(null);
      youtube.search(query).then(videos => setVideos(videos));
  }, [youtube]);

  // 마운트가 되거나 업데이트 될때 데이터를 받아옴
  // 빈 배열을 준다면, 마운트가 되었을 떄만 useEffect 호출
  useEffect(() => {
    youtube.mostPopular() //
      .then(videos => setVideos(videos));
  }, [youtube]);

  // VideoList && VideoDetail 같은 Component 태그들은 className같은걸 주지 못한다 --> Props로 인식해버린다.
  // --> 따라서 div같은걸로 감싸서 거기서 css 처리 해줘야함.
  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search}/>
      <section className={styles.content}>
          {selectedVideo && (
            <div className={styles.detail}>
              <VideoDetail video={selectedVideo}/>
            </div>
          )}
        <div className={styles.list}>
          <VideoList videos={videos} onVideoClick={selectVideo}
            display={selectedVideo ? 'list' : 'grid'}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
