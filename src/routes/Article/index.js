module.exports = {
    path: 'article/:articleId',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/ArticleHandler'))
        })
    }
}