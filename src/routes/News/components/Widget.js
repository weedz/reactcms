import React from 'react';
import News from './News';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNews } from '../../../actions/newsActions';

class Widget extends React.Component {

    constructor() {
        super();
    }
    componentWillMount() {
        this.props.fetchNews(1);
    }
    render() {
        return(
            <News articles={this.props.articles}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        articles: state.news.articles,
        lastFetch: state.news.lastFetch
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchNews
    }, dispatch);
}
const defaultExport = connect(mapStateToProps, matchDispatchToProps)(Widget);

export default defaultExport;
module.exports = defaultExport;