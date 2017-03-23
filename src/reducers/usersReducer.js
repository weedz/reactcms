export default function reducer(state={
    users: [],
    fetching: false,
    fetched: false,
    error: null
},action) {
    switch (action.type) {
        case "FETCH_USER_LIST_PENDING":
            return {...state,
                fetching: true,
            };
        case "FETCH_USER_LIST_FULFILLED":
            return {...state,
                users: action.payload.data.users || [],
                fetched: true,
                fetching: false,
                error: action.payload.message,
            };
    }
    return state;
}