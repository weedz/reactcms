import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppContainer from './components/AppContainer';

import Home from './components/Home';
import News from './routes/News';
import Wiki from './routes/Wiki';
import User from './routes/User';

const Routes = () => (
    <Router>
        <AppContainer>
            <Route exact path="/" component={Home} />
            <Route path="/news" component={News} />
            <Route path="/wiki" component={Wiki} />
            <Route path="/user" component={User} />
        </AppContainer>
    </Router>
);

export default Routes;