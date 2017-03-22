export default function reducer(state={
    articles: [],
    numberOfArticles: 0,
    fetching: false,
    lastFetch: 0
}, action) {
    switch (action.type) {
        case "socket/FETCH_NEWS" : {
            return {...state,
                fetching: true
            }
        }
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
                numberOfArticles: data.articles.length
            }
        }
        case "FETCH_NEWS_COUNT_FULFILLED": {
            return {...state,
                numberOfArticles: action.payload.articles
            }
        }
    }
    return state;
}