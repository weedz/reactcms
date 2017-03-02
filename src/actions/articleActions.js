export function fetchArticle(id) {
    return {
        type: "FETCH_ARTICLE",
        payload: fetch(`/api/news/article/${id}`).then(res => (res.json()))
    };
}