import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import './index.css';

const rootRoute = {
    childRoutes: [ {
        path: '/',
        getIndexRoute(partialNextState, cb) {
            cb(null, {
                component: require('./components/Home')
            })
        },
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('./components/App'))
            })
        },
        childRoutes: [
            require('./routes/News'),
            require('./routes/Wiki'),
            {
                path: '*',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require('./components/NotFound'))
                    })
                }
            }
        ]
    } ]
};

ReactDOM.render(
    <Router
        history={browserHistory}
        routes={rootRoute}
    >
    </Router>,
  document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}