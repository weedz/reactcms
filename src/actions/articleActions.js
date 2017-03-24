import { graphqlFetch } from './helpers';
/*export function fetchArticle(id) {
    return {
        type: "FETCH_ARTICLE",
        payload: fetch(`/api/news/article/${id}`).then(res => (res.json()))
    };
}*/
export function fetchArticleGraphQL(id) {
    const query = `{
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
    return {
        type: "FETCH_ARTICLE",
        payload: graphqlFetch(query).then(res => res.json())
    };
}