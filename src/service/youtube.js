/**
 * 리액트도 MVC기반의 하나이며 view를 담당하고 있다.
 * 어플리케이션에서 조금 더 역할에 맡게 세부적으로 레이어를 나누어서
 * 그들만의 한 가지의 것이 한 가지의 responsibility를 가질 수 있도록 세분화해서 구조적으로 나눠 테스트를 쉽게 만들어야 한다.
 * 
 * 리액트는 뷰레이어를 담당하며 단순히 사용자에게 데이터를 보여주고 클리이 되면 이벤트 자체를 처리하는 뷰에 관련된 로직만 수행한다.
 * 비지니스 로직과 네트워크 통신등 모든걸 다 할 수 있도록 만들면 안됨.
 * app.jsx에서 모든걸 집어넣으면 안되기에 service를 따로 뺌
 * 
 * 따로 클래스를 만들고 컴포넌트 안에 주입해주는 식으로 만들어야함.
 * dependency를 주입(injection) --> dependency injection이라고 부름.
 */

// 네트워크 처리 서비스
class Youtube{
    constructor(key){
        this.key = key;
        this.getRequestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
    }

    // 인기 동영상
    async mostPopular(){
        // 유튜브 데이터 받아오기 , postman에서 확인하면서
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos/?part=snippet&chart=mostPopular&maxResults=25&key=${this.key}`,
            this.getRequestOptions);
        const result = await response.json();
        return result.items;
    }

    // 검색
    async search(query){
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=AIzaSyBibmaM7KTcv56ArgrQPsy4jDUblIOBkeM`,
            this.getRequestOptions);
        const result = await response.json();
        return result.items.map(item => ({ ...item, id: item.id.videoId }));  // 검색하는 기존의 id구조와 달라서 id만 다시 수정해서 바꿔줌
    }

}

export default Youtube