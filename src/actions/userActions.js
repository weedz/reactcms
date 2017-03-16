import jwtDecode from 'jwt-decode';

export function setCurrentUser(user) {
    return {
        type: "SET_CURRENT_USER",
        payload: user
    }
}

export function validateToken(token) {
    return dispatch => {
        return fetch('/api/auth/check', {
            headers: {
                'authorization': `bearer ${token}`
            }
        }).then(res =>
            res.json()
        ).then(json => {
            if (json.errors) {
                localStorage.removeItem('jwtToken');
                return Promise.reject(json.errors);
            } else {
                dispatch(setCurrentUser(json));
            }
        })
    }
}

export function logout() {
    localStorage.removeItem('jwtToken');
    return {
        type: "LOGOUT_USER"
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
                localStorage.removeItem('jwtToken');
                return Promise.reject(json.errors);
            } else {
                localStorage.setItem('jwtToken',json.token);
                dispatch(setCurrentUser(jwtDecode(json.token)));
            }
        })
    }
}