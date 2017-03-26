const { verifyAuth } = require('../server/helper');
const model = require('../server/models');
const {
    GraphQLInt,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql');
const { resolver, relay: {sequelizeConnection} } = require('graphql-sequelize');

const ArticleType = new GraphQLObjectType({
    name: 'Article',
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
    fields: () => ({
        id: {type: GraphQLInt},
        username: {type: GraphQLString},
        articles: {
            type: UserArticlesConnection.connectionType,
            args: UserArticlesConnection.connectionArgs,
            resolve: UserArticlesConnection.resolve,
        }
    })
});

const UsersConnection = sequelizeConnection({
    name: 'Users',
    nodeType: UserType,
    target: model.User,
});

const UserArticlesConnection = sequelizeConnection({
    name: 'UserArticles',
    nodeType: ArticleType,
    target: model.User.Articles,
    connectionFields: {
        total: {
            type: GraphQLInt,
            resolve: ({source}) => source.countNews()
        }
    }
});

const ArticlesConnection = sequelizeConnection({
    name: 'Articles',
    nodeType: ArticleType,
    target: model.News,
    connectionFields: {
        total: {
            type: GraphQLInt,
            resolve: () => model.News.count()
        }
    }
});

const QueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        article: {
            type: ArticleType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: resolver(model.News)
        },
        articles: {
            type: ArticlesConnection.connectionType,
            args: ArticlesConnection.connectionArgs,
            resolve: ArticlesConnection.resolve,
        },
        user: {
            type: UserType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLInt)}
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