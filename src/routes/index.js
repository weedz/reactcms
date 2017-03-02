const rootRoute = {
    childRoutes: [ {
        path: '/',
        component: require('../components/AppContainer'),
        childRoutes: [
            require('./News'),
            require('./Wiki'),
            require('./User'),
            {
                path: '*',
                component: require('../components/NotFound')
            }
        ],
        indexRoute: {
            component: require('../components/Home')
        }
        /*getIndexRoute(partialNextState, cb) {
            cb(null, {
                component: require('../components/Home')
            })
        },
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
        }*/

    } ]
};
export default rootRoute;