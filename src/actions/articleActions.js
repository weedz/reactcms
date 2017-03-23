/*export function fetchArticle(id) {
    return {
        type: "FETCH_ARTICLE",
        payload: fetch(`/api/news/article/${id}`).then(res => (res.json()))
    };
}*/
export function fetchArticleGraphQL(id) {
    let query = `{
        article(id:${id}) {
            id,
            title,
            intro,
            content,
            createdAt,
            author {
                id,
                username,
            }
        }
    }`;
    query = query.replace(/\s/g,'');
    return {
        type: "FETCH_ARTICLE",
        payload: fetch('/graphql',{
            method: 'post',
            headers: {
                'Content-Type':'application/graphql'
            },
            body: query,
        }).then(res => res.json())
    }
}