export default function reducer(state={
    user: false,
    fetching: false,
    fetched: false,
    error: null
},action) {
    switch (action.type) {
        case "AUTHORIZE_USER_PENDING": {
            return {...state,
                fetching: true,
                fetched: false
            }
        }
        case "AUTHORIZE_USER_REJECTED": {
            return {...state,
                fetching: false,
                error: true,
            }
        }
        case "SET_CURRENT_USER": {
            return {...state,
                fetching: false,
                fetched: true,
                user: action.payload,
            }
        }
        case "LOGOUT_USER": {
            return {...state,
                user: false
            }
        }
        case "NEW_USER_PENDING": {
            return {...state,
                fetching: true,
            }
        }
        case "NEW_USER_FULFILLED": {
            const newState = {
                error: null,
                user: false,
            };
            if (action.payload.error)
                newState.error = action.payload.error;
            else
                newState.user = action.payload;
            return {...state,
                fetching: false,
                fetched: true,
                ...newState,
            }
        }
        case "NEW_USER_REJECTED": {
            return {...state,
                fetching: false,
                fetched: true,
                error: action.payload
            }
        }
    }
    return state;
}