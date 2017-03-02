import { applyMiddleware, createStore } from 'redux';
import promise from 'redux-promise-middleware';
import Thunk from 'redux-thunk';
//import logger from 'redux-logger';

import rootReducers from './reducers';

const middleware = applyMiddleware(promise(), /*logger(),*/ Thunk);

export default function configureStore() {
    const store = createStore(rootReducers, middleware);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducers = require('./reducers').default;
            store.replaceReducer(nextRootReducers);
        });
    }

    return store;
}