module.exports = {
    path: 'dashboard',
    component: require('./components/Dashboard')
    /*getComponent(parialState, cb) {
        require.ensure([], require => {
            cb(null, require('./components/Dashboard'))
        })
    }*/
};