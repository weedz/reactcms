export default function reducer(state={
    user: false,
    fetching: false,
    fetched: false,
    error: null
},action) {
    switch (action.type) {
        case "AUTHORIZE_USER_PENDING": {
            return {...state,
                fetching: true
            }
        }
        case "AUTHORIZE_USER_FULFILLED": {
            return {...state,
                fetching: false,
                fetched: true,
                user: action.payload
            }
        }
        case "ADD_USER_PENDING": {
            return {...state,
                fetching: true,
            }
        }
        case "ADD_USER_FULFILLED": {
            return {...state,
                fetching: false,
                fetched: true,
                user: action.payload
            }
        }
        // handle all rejected/not defined actions
        default: {
            return {...state,
                fetching: false,
                fetched: false,
                error: action.payload
            }
        }
    }
}