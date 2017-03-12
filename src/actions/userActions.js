import axios from 'axios';
import jwtDecode from 'jwt-decode';

export function setCurrentUser(user) {
    return {
        type: "SET_CURRENT_USER",
        payload: user
    }
}

export function authorizeUser(user) {
    return dispatch => {
        return axios.post('/api/auth', user).then(res => {
            const token = res.data.token;
            localStorage.setItem('jwtToken',token);
            dispatch(setCurrentUser(jwtDecode(token)));
        })
    }
}