export function fetchNews() {
    return {
        type: "FETCH_NEWS",
        payload: fetch('/api/news/archive/1')
    };
}
export function toggleNews(id) {
    return {
        type: "TOGGLE_NEWS",
        payload: id
    }
}