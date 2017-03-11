export function authorizeUser(user) {
    return {
        type: "AUTHORIZE_USER",
        payload: fetch('/api/auth', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type' : 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(user)
        }).then(res => res.json())
    }
}