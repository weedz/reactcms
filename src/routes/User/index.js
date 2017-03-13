module.exports = {
    path: 'user',
    childRoutes: [
        require('./routes/Login'),
        require('./routes/Register'),
        require('./routes/Dashboard')
    ]
    /*getChildRoutes(partialNextState, cb) {
        require.ensure([], require => {
            cb(null, [
                require('./routes/Login'),
                require('./routes/Register'),
                require('./routes/Dashboard')
            ])
        })
    },*/
};