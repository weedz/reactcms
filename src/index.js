import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const render = (Component) => ReactDOM.render(
    <Component />,
    document.getElementById('root')
);
render(App);

/*ReactDOM.render(
    <App />,
    document.getElementById('root')
);*/

if (module.hot) module.hot.accept('./App', () => render(App));