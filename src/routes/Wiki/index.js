module.exports = {
    path: 'wiki',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/Wiki'))
        })
    }
};