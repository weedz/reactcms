export default function reducer(state={
    user: false,
    status: false,
    fetching: false,
    fetched: false,
    error: null
},action) {
    switch (action.type) {
        case "AUTHORIZE_USER_PENDING": {
            return {...state,
                fetching: true,
                fetched: false,
                status: false,
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
                status: false,
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
                error: null,
                status: 'Pending...'
            }
        }
        case "NEW_USER_FULFILLED": {
            const newState = {
                error: null,
                user: false,
                status: false,
            };
            if (action.payload.error)
                newState.error = action.payload.error;
            else
                newState.status = action.payload.message;
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