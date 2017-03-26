const { verifyAuth } = require('../server/helper');

const {
    GraphQLInt,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql');
const { resolver } = require('graphql-sequelize');

const model = require('../server/models');

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    description: '',
    fields: () => ({
        id: {type: GraphQLString},
        title: {type: GraphQLString},
        intro: {type: GraphQLString},
        content: {type: GraphQLString},
        createdAt: {type: GraphQLString},
        author: {
            type: UserType,
            resolve: resolver(model.News.Author)
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    description: '',
    fields: () => ({
        id: {type: GraphQLInt},
        username: {type: GraphQLString},
        articles: {
            type: new GraphQLList(ArticleType),
            resolve: resolver(model.User.Articles)
        }
    })
});

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: '',
    fields: {
        article: {
            type: ArticleType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: resolver(model.News)
        },
        articles: {
            type: new GraphQLList(ArticleType),
            args: {
                limit: { type: GraphQLInt },
                offset: { type: GraphQLInt },
                order: { type: GraphQLString }
            },
            resolve: resolver(model.News)
        },
        user: {
            type: UserType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve: resolver(model.User)
        },
        users: {
            type: new GraphQLList(UserType),
            args: {
                limit: { type: GraphQLInt },
                offset: { type: GraphQLInt },
                order: { type: GraphQLString },
            },
            resolve: resolver(model.User, {
                before: (options, args, { token }) => {
                    if (token && verifyAuth(token.split(' ')[1], 15)) {
                        return options;
                    } else {
                        return {
                            limit: 0
                        };
                    }
                },
            })
        }
    }
});

const defaultExport = new GraphQLSchema({
    query: QueryType
});
module.exports = defaultExport;