module.exports = {
    path: 'news',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/News'))
        })
    }
};