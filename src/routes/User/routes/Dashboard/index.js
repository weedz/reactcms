module.exports = {
    path: 'dashboard(/:action)',
    component: require('./components/Dashboard')
    /*getComponent(parialState, cb) {
        require.ensure([], require => {
            cb(null, require('./components/Dashboard'))
        })
    }*/
};