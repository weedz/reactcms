export default function reducer(state={
    article: {},
    lastFetch: 0,
    fetching: false,
    fetched: false
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
            }
        }
        case "FETCH_ARTICLE_FULFILLED": {
            return {...state,
                fethcing: false,
                article: action.payload
            }
        }
    }
    return state;
}