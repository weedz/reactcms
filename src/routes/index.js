import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AppContainer from '../components/AppContainer';

import Loadable from 'react-loadable';

function LoadingComponent({error}) {
    if (error) {
        console.log(error);
        return <p>Error</p>
    } else {
        return <p>Loading...</p>
    }
}

const Home = Loadable({
    loader: () => import('../components/Home'),
    LoadingComponent
});
const News = Loadable({
    loader: () => import('./News'),
    LoadingComponent
});
const User = Loadable({
    loader: () => import('./User'),
    LoadingComponent
});
const Wiki = Loadable({
    loader: () => import('./Wiki'),
    LoadingComponent
});

const Article = Loadable({
    loader: () => import('./Article'),
    LoadingComponent
});

const Routes = () => (
    <BrowserRouter>
        <AppContainer>
            <Route exact path="/" component={Home} />
            <Route path="/news" component={News} />
            <Route path="/article/:articleId" component={Article} />
            <Route path="/wiki" component={Wiki} />
            <Route path="/user" component={User} />
        </AppContainer>
    </BrowserRouter>
);

export default Routes;