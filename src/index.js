import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Routes from './routes';

import { validateToken } from './actions/authActions';

import Store from './store';

// Authorize user
const store = Store();
if (localStorage.getItem('jwtToken')) {
    store.dispatch(validateToken(localStorage.getItem('jwtToken')));
}

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
);