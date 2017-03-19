import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNews, fetchNewsCount } from '../../../actions/newsActions';

let loadNews = require('bundle-loader!./News');
/*
TODO: client side cache to prevent refetch of already fetched data
TODO: use cursors to calculate archive page
 */
class Handler extends React.Component {

    constructor(props) {
        super();
        this.state = {
            page: 1
        };
    }
    componentWillMount() {
        this.updateArchive();
    }

    updateArchive() {
        this.props.fetchNews(this.state.page);
    }

    render() {
        const currentPage = Number(this.state.page);
        const links = [];
        const content = loadNews(News => {
            return News
        });
            //;
        return(
            <div className="component">
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