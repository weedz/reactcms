module.exports = {
    path: 'wiki',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/Wiki'))
        })
    }
};