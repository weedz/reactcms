import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import App from './App';

const render = (Component) => ReactDOM.render(
    <Provider store={store()}>
        <Component />
    </Provider>,
    document.getElementById('root')
);
render(App);

/*ReactDOM.render(
    <App />,
    document.getElementById('root')
);*/

if (module.hot) module.hot.accept('./App', () => render(App));