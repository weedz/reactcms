const rootRoute = {
    path: '/',
    component: require('../components/AppContainer'),
    getIndexRoute(location,cb) {
        require.ensure([], require => {
            cb(null, {
                component: require('../components/Home')
            })
        })
    },
    getChildRoutes(location, cb) {
        require.ensure([], require => {
            cb(null, [
                require('./News'),
                require('./Wiki'),
                require('./User'),
                {
                    path: '*',
                    component: require('../components/NotFound')
                }
            ])
        })
    },
};
export default rootRoute;