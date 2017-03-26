import { graphqlFetch } from './helpers';

export function fetchNewsGraphQL(cursor='') {
    const query = `query($after:String){
            articles(first:10,after:$after) {
                pageInfo {
                    hasNextPage,
                    hasPreviousPage,
                    startCursor,
                    endCursor,
                }
                edges {
                    cursor,
                    node {
                        id,
                        title,
                        intro,
                        createdAt,
                        author {
                            id,
                            username,
                        }
                    }
                }
            }
        }`;
    return {
        type: "FETCH_NEWS",
        payload: graphqlFetch(query,{
            after:cursor
        }).then(res => res.json())
    };
}