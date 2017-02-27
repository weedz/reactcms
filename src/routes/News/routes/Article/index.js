module.exports = {
    path: 'article/:id',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/ArticleHandler'))
        })
    },
};