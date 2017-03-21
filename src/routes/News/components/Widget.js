import React from 'react';
import News from './News';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

const defaultExport = connect((state) => ({
    articles: state.news.articles,
    lastFetch: state.news.lastFetch
}), (dispatch) => (
    bindActionCreators({
        fetchNewsGraphQL
    }, dispatch)
))(Widget);

export default defaultExport;
