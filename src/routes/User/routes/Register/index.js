module.exports = {
    path: 'register',
    //component: require('./components/Register')
    getComponent(nextState, cb) {
        require.ensure([], require => {
            cb(null, require('./components/Register'))
        })
    },
};