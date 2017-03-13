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
    } ]
};
export default rootRoute;