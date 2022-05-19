import styles from './search_header.module.css'
import React, { useRef } from 'react';

const SearchHeader = ({onSearch}) => { // prop으로 서치 콜백을 받아온다.

        const inputRef = useRef();  // input에서 값을 받아옴

        // 클릭과 엔터를 클릭했을때 동일한 로직을 수행하기 때문에 함수 하나 더 빼줌
        const handleSearch = () => {
            const value = inputRef.current.value;
            onSearch(value);
        }

        const onClick = () => {
            handleSearch();
        };

        const onKeyPress = event => {
            if(event.key === 'Enter'){  // 엔터를 칠 경우만 서치 이벤트 동작
                handleSearch();
            }
        }

        return (
            <header className={styles.header}>
                <div className={styles.logo}>
                    <img src="/images/logo.png" alt="logo" className={styles.img}/>
                    <h1 className={styles.title}>Youtube</h1>
                </div>
                <input ref={inputRef} 
                       className={styles.input} 
                       type="search" placeholder='Search...' 
                       onKeyPress={onKeyPress}/>
                <button className={styles.button} type="submit" onClick={onClick}>
                    <img className={styles.buttonImg} src="/images/search.png" alt="searcg"/>
                </button>
            </header>
        );
};

export default SearchHeader;