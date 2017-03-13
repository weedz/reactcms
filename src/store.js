import { applyMiddleware, createStore, compose } from 'redux';
import promise from 'redux-promise-middleware';
import Thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

//import logger from 'redux-logger';

import rootReducers from './reducers';

const socket = io();
const socketIoMiddleware = createSocketIoMiddleware(socket, "socket/");

const middleware = applyMiddleware(promise(), /*logger(),*/ Thunk, socketIoMiddleware);

export default function configureStore() {
    const store = createStore(rootReducers, compose(
        middleware,
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducers = require('./reducers').default;
            store.replaceReducer(nextRootReducers);
        });
    }

    return store;
}