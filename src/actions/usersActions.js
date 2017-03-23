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
    let query = `{
            users {
                id,
                username,
            }
        }`;
    query = query.replace(/\s/g,'');
    return {
        type: "FETCH_USER_LIST",
        payload: fetch('/graphql', {
            method: 'post',
            headers: {
                'authorization': `bearer ${token}`,
                'Content-Type':'application/graphql',
            },
            body: query
        }).then(res => res.json())
    }
}