const rootRoute = {
    childRoutes: [ {
        path: '/',
        getIndexRoute(partialNextState, cb) {
            cb(null, {
                component: require('../components/Home')
            })
        },
        component: require('../components/AppContainer'),
        getChildRoutes(partialNextState, cb) {
            require.ensure([], require => {
                cb(null, [
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
                ])
            })
        }
        /*childRoutes: [
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
        ]*/
    } ]
};
export default rootRoute;