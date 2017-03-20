import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Routes from './routes.js';

import { validateToken } from './actions/userActions';

import Store from './store';

// Authorize user
const store = Store();
if (localStorage.getItem('jwtToken')) {
    store.dispatch(validateToken(localStorage.getItem('jwtToken')));
}

ReactDOM.render(
    <Provider store={store}>
        <Routes>
            <p>ROOT?</p>
        </Routes>
    </Provider>,
    document.getElementById('root')
);