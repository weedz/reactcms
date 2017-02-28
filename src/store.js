import { applyMiddleware, createStore } from 'redux';
import promise from 'redux-promise-middleware';

import rootReducers from './reducers/index';

/*const logger = (state) => (next) => (action) => {
    console.log(action);
    next();
};*/

const middleware = applyMiddleware(promise());

export default function configureStore() {
    const store = createStore(rootReducers, middleware);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducers = require('./reducers/index').default;
            store.replaceReducer(nextRootReducers);
        });
    }

    return store;
}