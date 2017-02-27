export default function reducer(state={
    numberOfArticles: 0
}, action) {
    switch (action.type) {
        case "TOGGLE_NEWS": {
            console.log(action);
            return action.payload;
        }
        case "FETCH_NEWS" : {
            break;
        }
        case "FETCH_NEWS_REJECTED": {
            break;
        }
        case "FETCH_NEWS_FULFILLED": {
            break;
        }
        default:
            return state;
    }

}