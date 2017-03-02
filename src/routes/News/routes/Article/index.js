module.exports = {
    path: 'article/:articleId',
    component: require('./components/ArticleHandler')
    /*getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/ArticleHandler'))
        })
    },*/
};