/*export function fetchNews(page) {
    return {
        //type: 'socket/FETCH_NEWS',
        //payload: {page}
        type: "FETCH_NEWS",
        payload: fetch(`/api/news/archive/${page}`).then(res => res.json())
    }
}*/
export function fetchNewsCount() {
    return {
        type: "FETCH_NEWS_COUNT",
        payload: fetch('/api/news/count').then(res => res.json())
    }
}
// TODO: use cursor to implement pagination
export function fetchNewsGraphQL() {
    let query = `{
            articles {
                id,
                title,
                intro,
                createdAt,
                author {
                    id,
                    username,
                }
            }
        }`;
    query = query.replace(/\s/g,'');
    return {
        type: "FETCH_NEWS",
        payload: fetch('/graphql', {
            method: 'post',
            headers: {
                'Content-Type':'application/graphql'
            },
            body: query
        }).then(res => res.json())
    }
}