import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppContainer from './components/AppContainer';

import Home from './components/Home';
import News from './routes/News/components/Handler';
import Wiki from './routes/Wiki/components/Wiki';

const Routes = () => (
    <Router>
        <AppContainer>
            <Route exact path="/" component={Home} />
            <Route path="/news" component={News} />
            <Route path="/wiki" component={Wiki} />
        </AppContainer>
    </Router>
);

export default Routes;