module.exports = {
    path: 'user',
    childRoutes: [
        require('./routes/Login'),
        require('./routes/Register')
    ]
};