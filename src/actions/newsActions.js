export function fetchNews(page) {
    return {
        //type: 'socket/FETCH_NEWS',
        //payload: {page}
        type: "FETCH_NEWS",
        payload: fetch(`/api/news/archive/${page}`).then(res => res.json())
    }
}
export function fetchNewsCount() {
    return {
        type: "FETCH_NEWS_COUNT",
        payload: fetch('/api/news/count').then(res => res.json())
    }
}