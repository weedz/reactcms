import React from 'react';
import News from './News';

import wrapper from '../../../wrappers/ReduxWrapper';
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

export default wrapper(Widget, (state) => ({
    articles: state.news.articles,
    lastFetch: state.news.lastFetch
}), {
    fetchNewsGraphQL
});
