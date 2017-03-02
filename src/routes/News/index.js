module.exports = {
    path: 'news',
    component: require('./components/Handler'),
    childRoutes:[
        require('./routes/Article'),
        require('./routes/Archive')
    ]
    /*getComponent(nextState, cb) {
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
    }*/
};