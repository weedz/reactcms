import jwtDecode from 'jwt-decode';

export function setCurrentUser(user) {
    return {
        type: "SET_CURRENT_USER",
        payload: user
    }
}

export function authorizeUser(user) {
    return dispatch => {
        return fetch('/api/auth', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res =>
            res.json()
        ).then(json => {
            if (json.errors) {
                return Promise.reject(json.errors);
            } else {
                localStorage.setItem('jwtToken',json.token);
                dispatch(setCurrentUser(jwtDecode(json.token)));
            }
        })
    }
}