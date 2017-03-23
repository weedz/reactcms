import React from 'react';
import Relay from 'react-relay';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppContainer from '../components/AppContainer';

import Loadable from 'react-loadable';

function LoadingComponent({error}) {
    if (error) {
        return <p>Error</p>
    } else {
        return <p>Loading...</p>
    }
}

/*const Home = Loadable({
    loader: () => import('../components/Home'),
    LoadingComponent
});*/
import Home from '../components/Home';
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

/*Relay.createContainer(Routes, {
        fragments: {
            root: () => Relay.QL`
                fragment on UsersConnection {
                    ${Home.getFragment('root')}
                }
            `
        }
    }
);*/
