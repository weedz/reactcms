import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNews, fetchNewsCount } from '../../../actions/newsActions';

import News from './News';
/*
TODO: client side cache to prevent refetch of already fetched data
 */
class Handler extends React.Component {

    constructor(props) {
        super();
        this.state = {
            page: Number(props.params.page) || 1
        };
    }
    componentWillMount() {
        this.props.fetchNewsCount();
        this.updateArchive();
    }
    componentDidUpdate() {
        const currentPage = Number(this.props.params.page);
        if (isNaN(currentPage) && this.props.children) {

        } else if (isNaN(currentPage) && this.state.page != 1) {
            this.state.page = 1;
            this.updateArchive();
        } else if (!isNaN(currentPage) && this.state.page != currentPage) {
            this.state.page = currentPage;
            this.updateArchive();
        }
    }

    updateArchive() {
        this.props.fetchNews(this.state.page);
    }

    render() {
        const currentPage = Number(this.state.page);
        const links = [];
        if (this.props.params.page > 1 && this.props.articles.length > 0) {
            links.push(<Link key="prev" to={`/news/archive/${currentPage-1}`}>Previous</Link>)
        }
        if (this.props.numberOfArticles > this.props.params.page * 10) {
            links.push(<Link key="next" to={`/news/archive/${currentPage+1}`}>Next</Link>)
        }
        if (this.props.articles.length === 0) {
            links.push(<Link key="news" to="/news">News</Link>);
        } else if (this.props.params.page === undefined) {
            links.push(<Link key="archive" to="/news/archive/1">Archive</Link>);
        }
        const content = this.props.children ||
            <News articles={this.props.articles}/>;
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
    lastFetch: state.news.lastFetch
}), (dispatch) => (
    bindActionCreators({
        fetchNews, fetchNewsCount
    }, dispatch)
))(Handler);

export default defaultExport;
module.exports = defaultExport;