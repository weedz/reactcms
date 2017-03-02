import { combineReducers } from 'redux';

import news from './newsReducer';
import article from './articleReducer';

export default combineReducers({
    news,
    article
})