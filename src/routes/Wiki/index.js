import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

module.exports = {
    path: 'wiki',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/Wiki'))
        })
    }
};