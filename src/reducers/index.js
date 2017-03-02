import { combineReducers } from 'redux';

import news from './newsReducer';
import article from './articleReducer';
import user from './userReducer';

export default combineReducers({
    news,
    article,
    user
})