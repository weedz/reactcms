const rootRoute = {
    childRoutes: [ {
        path: '/',
        getIndexRoute(partialNextState, cb) {
            cb(null, {
                component: require('../components/Home')
            })
        },
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../components/AppContainer'))
            })
        },
        childRoutes: [
            require('./News'),
            require('./Wiki'),
            {
                path: '*',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require('../components/NotFound'))
                    })
                }
            }
        ]
    } ]
};
export default rootRoute;