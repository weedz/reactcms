export default function reducer(state={
    articles: [],
    pageInfo: false,
    fetching: false,
    lastFetch: 0
}, action) {
    switch (action.type) {
        case "FETCH_NEWS_REJECTED": {
            return {...state,
                fetching: false,
            }
        }
        case "FETCH_NEWS_FULFILLED": {
            const data = action.payload.data;
            return {...state,
                fetching: false,
                lastFetch: Date.now(),
                articles: data.articles.edges,
                pageInfo: data.articles.pageInfo,
            }
        }
    }
    return state;
}