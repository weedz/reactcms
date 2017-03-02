module.exports = {
    path: 'wiki',
    component: require('./components/Wiki')
    /*getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/Wiki'))
        })
    }*/
};