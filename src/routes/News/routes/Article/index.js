module.exports = {
    path: 'article/:articleId',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/ArticleHandler'))
        })
    },
};