const jwt = require('jsonwebtoken');
const config = require('config');

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
            resolve: (source, args, context, { rootValue }) => {
                if(requireAuth(15, rootValue)) {
                    return model.User.findAll()
                } else {
                    return null;
                }
            }
        }
    }
});

function requireAuth(accessLevel, auth) {
    if (auth) {
        const token = auth.split(' ')[1];
        if (token) {
            const secret = config.get('authSecretKey');
            try {
                const decoded = jwt.verify(token, secret);
                return decoded.accessLevel >= accessLevel;
            } catch (err) {
                return false;
            }
        }
    }
}

const defaultExport = new GraphQLSchema({
    query: QueryType
});
module.exports = defaultExport;