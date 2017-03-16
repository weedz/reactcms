module.exports = {
    path: 'dashboard(/:action)',
    getComponent(location, cb) {
        require.ensure([], require => {
            cb(null, require('./components/Dashboard'))
        })
    }
};