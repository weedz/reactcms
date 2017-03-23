const {
    GraphQLBoolean,
    GraphQLEnumType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} = require('graphql');
const {
    resolver,
    relay: {
        sequelizeNodeInterface,
        sequelizeConnection
    }
} = require('graphql-sequelize');

const {
    globalIdField,
} = require('graphql-relay');

const {
    sequelize,
    User,
    News,
} = require('./models');
const {
    nodeInterface,
    nodeField,
    nodeTypeMapper
} = sequelizeNodeInterface(sequelize);


const ArticleType = new GraphQLObjectType({
    name: News.name,
    fields: () => ({
        _id: {
            type: GraphQLInt,
            resolve(obj) {
                return obj.id;
            }
        },
        id: globalIdField(News.name),
        title: {type: GraphQLString},
        intro: {type: GraphQLString},
        content: {type: GraphQLString},
        createdAt: {type: GraphQLString},
        author: {
            type: UserType,
            resolve: resolver(News.Author)
        }
    }),
    interfaces: [nodeInterface]
});

const UserType = new GraphQLObjectType({
    name: User.name,
    fields: () => ({
        _id: {
            type: GraphQLInt,
            resolve(obj) {
                return obj.id;
            }
        },
        id: globalIdField(User.name),
        username: {type: GraphQLString},
        articles: {
            type: userArticleConnection.connectionType,
            args: userArticleConnection.connectionArgs,
            resolve: userArticleConnection.resolve
        },
    }),
    interfaces: [nodeInterface]
});

nodeTypeMapper.mapTypes({
    [User.name]: UserType,
    [News.name]: ArticleType
});

const userArticleConnection = sequelizeConnection({
    name: 'userArticle',
    nodeType: ArticleType,
    target: User.Articles,
    where: (key, value, currentWhere) => ({
        [key]:value,
    }),
    orderBy: new GraphQLEnumType({
        name: 'UserArticleOrderBy',
        values: {
            AGE: {value: ['createdAt','DESC']},
            TITLE: {value: ['title','ASC']}
        }
    }),
    connectionFields: {
        total: {
            type: GraphQLInt,
            resolve: ({source}) => source.countNews()
        }
    },
});

const userConnection = sequelizeConnection({
    name: 'Users',
    nodeType: UserType,
    target: User,
    where: (key, value, currentWhere) => ({
        [key]:value,
    }),
    connectionFields: {
        total: {
            type: GraphQLInt,
            resolve: (source) =>  source.fullCount || source.edges.length
        }
    },
    orderBy: new GraphQLEnumType({
        name: 'UserOrderBy',
        values: {
            ID: {value: ['id','ASC']},
            NAME: {value: ['username','ASC']}
        }
    })
});

const articleConnection = sequelizeConnection({
    name: 'Articles',
    nodeType: ArticleType,
    target: News,
    where: (key, value, currentWhere) => ({
        [key]:value,
    }),
    connectionFields: {
        total: {
            type: GraphQLInt,
            resolve: (source) =>  source.fullCount || source.edges.length
        }
    },
    orderBy: new GraphQLEnumType({
        name: 'ArticleOrderBy',
        values: {
            ID: {value: ['id','ASC']},
            AGE: {value: ['createdAt','DESC']}
        }
    })
});

const RootType = new GraphQLObjectType({
    name: 'Root',
    fields:() => ({
        root: {
            type: RootType,
        },
        article: {
            type: ArticleType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: resolver(News)
        },
        articles: {
            type: articleConnection.connectionType,
            args: articleConnection.connectionArgs,
            resolve: articleConnection.resolve
        },
        user: {
            type: UserType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: resolver(User)
        },
        users: {
            type: userConnection.connectionType,
            args: userConnection.connectionArgs,
            resolve: userConnection.resolve
        },
        node: nodeField,
    })
});

const defaultExport = new GraphQLSchema({
    query: RootType
});
module.exports = defaultExport;