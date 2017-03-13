import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

// Authorize user

const render = () => {
    const App = require('./App').default;
    ReactDOM.render(
    <Provider store={store()}>
        <App />
    </Provider>,
        document.getElementById('root')
    )
};

if (module.hot) module.hot.accept('./App', () => render());

render();