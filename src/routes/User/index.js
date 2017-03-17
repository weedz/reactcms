module.exports = {
    path: 'user',
    getChildRoutes(location, cb) {
        require.ensure([], require => {
            cb(null, [
                require('./routes/Login'),
                require('./routes/Register'),
                require('./routes/Dashboard')
            ])
        })
    },
};