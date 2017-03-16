import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNews, fetchNewsCount } from '../../../actions/newsActions';

import loadNews from 'bundle-loader?lazy!./News';
/*
TODO: client side cache to prevent refetch of already fetched data
 */
class Handler extends React.Component {

    constructor(props) {
        super();
        this.state = {
            page: 1
        };
    }
    componentWillMount() {
        this.props.fetchNewsCount();
        this.updateArchive();
    }

    updateArchive() {
        this.props.fetchNews(this.state.page);
    }

    render() {
        const currentPage = Number(this.state.page);
        const links = [];
        const content = loadNews(mod => (
                    <mod articles={this.props.articles} />
                ));
            //<News articles={this.props.articles}/>;
        return(
            <div className="component">
                <p>handler</p>
                {content}
                <div>
                {this.props.children === null ? links: null}
                </div>
            </div>
        );
    }
}

const defaultExport = connect((state) => ({
    articles: state.news.articles,
    numberOfArticles: state.news.numberOfArticles,
    lastFetch: state.news.lastFetch,
    fetching: state.news.fetching,
}), (dispatch) => (
    bindActionCreators({
        fetchNews, fetchNewsCount
    }, dispatch)
))(Handler);

export default defaultExport;
module.exports = defaultExport;