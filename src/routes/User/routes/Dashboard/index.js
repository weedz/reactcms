module.exports = {
    path: 'dashboard',
    getComponent(parialState, cb) {
        require.ensure([], require => {
            cb(null, require('./components/Dashboard'))
        })
    }
}