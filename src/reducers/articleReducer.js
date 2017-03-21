export default function reducer(state={
    article: {},
    lastFetch: 0,
    fetching: false,
    fetched: false,
    error: false,
}, action) {
    switch (action.type) {
        case "FETCH_ARTICLE_PENDING": {
            return {...state,
                fetching: true,
            }
        }
        case "FETCH_ARTICLE_REJECTED": {
            return {...state,
                fetching: false,
                error: true,
            }
        }
        case "FETCH_ARTICLE_FULFILLED": {
            return {...state,
                fetching: false,
                lastFetch: Date.now(),
                article: action.payload.data.article
            }
        }
    }
    return state;
}