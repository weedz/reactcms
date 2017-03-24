export function graphqlFetch(query, variables, headers) {
    // remove line breaks and whitespace at beginning
    // of line as well as whitespace before }{)( characters
    query = query.replace(/\n|^\s+|\s+(?=[}{)(])/gm,'');

    return fetch('/graphql', {
        method:'post',
        headers: {...headers,
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            query,
            variables
        })
    })
}