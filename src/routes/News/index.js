module.exports = {
    path: 'news',
    component: require('./components/Handler'),
    childRoutes: [
        require('./routes/Article'),
        require('./routes/Archive')
    ]
};