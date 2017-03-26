import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Routes from './routes';

import { validateToken } from './actions/authActions';

import Store from './store';

// Authorize user
if (localStorage.getItem('jwtToken')) {
    Store.dispatch(validateToken(localStorage.getItem('jwtToken')));
}

render(
    <Provider store={Store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
);