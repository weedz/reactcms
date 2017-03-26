import React from 'react';
import News from './News';

import {ReduxWrapper} from '../../../wrappers';
import { fetchNewsGraphQL } from '../../../actions/newsActions';

class Widget extends React.Component {

    constructor() {
        super();
    }
    componentWillMount() {
        this.props.fetchNewsGraphQL();
    }
    render() {
        return(
            <News articles={this.props.articles}/>
        );
    }
}

export default ReduxWrapper(Widget, (state) => ({
    articles: state.news.articles,
    lastFetch: state.news.lastFetch
}), {
    fetchNewsGraphQL
});
