import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { validateToken } from './actions/userActions';

import Store from './store';

// Authorize user
const store = Store();
if (localStorage.getItem('jwtToken')) {
    store.dispatch(validateToken(localStorage.getItem('jwtToken')));
}

const render = () => {
    const App = require('./App').default;
    ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
        document.getElementById('root')
    )
};

if (module.hot) module.hot.accept('./App', () => render());

render();