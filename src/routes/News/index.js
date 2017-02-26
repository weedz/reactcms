module.exports = {
    path: 'news(/:page)',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/News'))
        })
    },
    /*getChildRoutes(partialNextState, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require('./routes/Article')
            ])
        })
    }*/
};