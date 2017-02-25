import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import App from './components/App';
import Home from './components/Home';
import News from './components/News';
import NotFound from './components/NotFound';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="news" component={News}/>
            <Route path="*" components={NotFound}/>
        </Route>
    </Router>
);

export default Routes;