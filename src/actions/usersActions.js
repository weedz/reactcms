import { graphqlFetch } from './helpers';
export function getUsers() {
    const token = localStorage.getItem('jwtToken');
    return {
        type: "FETCH_USER_LIST",
        payload: fetch('/api/users/all', {
            headers: {
                'authorization': `bearer ${token}`
            }
        }).then(res =>
            res.json()
        )
    }
}
export function getUsersGraphQL() {
    const token = localStorage.getItem('jwtToken');
    const query = `{
            users {
                id,
                username,
            }
        }`;
    return {
        type: "FETCH_USER_LIST",
        payload: graphqlFetch(query,undefined,{
            "authorization":`bearer ${token}`,
        }).then(res => res.json())
    };
}