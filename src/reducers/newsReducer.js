export default function reducer(state={
    articles: [],
    message: {},
    numberOfArticles: 0,
    fetching: false,
    lastFetch: 0
}, action) {
    switch (action.type) {
        case "FETCH_NEWS_PENDING" : {
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
            return {...state,
                fetching: false,
                lastFetch: Date.now(),
                articles: action.payload
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