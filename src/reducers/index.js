import { combineReducers } from 'redux';

import news from './newsReducer';
import article from './articleReducer';
import auth from './authReducer';
import users from './usersReducer';

export default combineReducers({
    news,
    article,
    auth,
    users
})