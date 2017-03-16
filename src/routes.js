import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/Home';
import News from './routes/News/components/Handler';
import AppContainer from './components/AppContainer';

const Routes = () => (
    <BrowserRouter>
        <AppContainer>
            <Route exact path="/" component={Home} />
            <Route path="/news" component={News}/>
        </AppContainer>
    </BrowserRouter>
);

export default Routes;