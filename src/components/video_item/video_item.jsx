import React, { memo } from 'react';
import styles from './video_item.module.css'  // POSTCSS 모듈화

// parameter 안에 원래는 props인데, props.video가 있다면 video를 적어주면 props.video를 video로 받아줌
// 그런데 video : { snippet } 쓰면 props.video.snippet이 video로 받아짐
const VideoItem = memo(
    ({ video, video: { snippet }, onVideoClick, display }) => {
      const displayType = display === 'list' ? styles.list : styles.grid;
      return (
        <li
          className={`${styles.container} ${displayType}`}
          onClick={() => onVideoClick(video)}
        >
          <div className={styles.video}>
            {/* <img src={props.video.snippet.thumbnails.medium.url} alt="video thumbnail"/> */}
            <img
              className={styles.thumbnail}
              src={snippet.thumbnails.medium.url}
              alt="video thumbnail"
            />
            <div className={styles.metadata}>
              <p className={styles.title}>{snippet.title}</p>
              <p className={styles.channel}>{snippet.channelTitle}</p>
            </div>
          </div>
        </li>
      );
    }
  );

export default VideoItem;
