module.exports = {
    path: 'news',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/Handler'))
        })
    },
    getChildRoutes(partialNextState, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require('./routes/Article'),
                require('./routes/Archive')
            ])
        })
    }
};