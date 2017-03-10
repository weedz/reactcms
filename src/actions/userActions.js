export function authorizeUser(user) {
    return {
        type: "AUTHORIZE_USER",
        payload: fetch('/api/auth', {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
    }
}