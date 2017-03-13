module.exports = {
    path: 'user',
    getChildRoutes(partialNextState, cb) {
        require.ensure([], require => {
            cb(null, [
                require('./routes/Login'),
                require('./routes/Register'),
                require('./routes/Dashboard')
            ])
        })
    },
};