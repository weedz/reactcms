import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNews, fetchNewsCount } from '../../../actions/newsActions';

import News from './News';

class Handler extends React.Component {

    constructor(props) {
        super();
        this.state = {
            page: Number(props.params.page) || 1
        };
    }
    componentWillMount() {
        this.props.fetchNewsCount();
        if (this.props.params.articleId === undefined) {
            this.updateArchive();
        }
    }

    updateArchive() {
        this.props.fetchNews(this.state.page);
    }
    nextPage() {
        this.state.page += 1;
        this.updateArchive();
    }
    prevPage() {
        this.state.page -= 1;
        this.updateArchive();
    }

    render() {
        if (this.props.params.page === undefined && this.props.params.articleId === undefined && this.state.page != 1) {
            this.state.page = 1;
            this.updateArchive();
            // Fetch news every 10 minute
        } else if (this.props.params.articleId === undefined && Date.now() - this.props.lastFetch > 600000) {
            this.updateArchive();
        }
        const currentPage = Number(this.props.params.page);
        const links = [];
        if (this.props.params.page > 1 && this.props.articles.length > 0) {
            links.push(<Link key="prev" onClick={this.prevPage.bind(this)} to={`/news/archive/${currentPage-1}`}>Previous</Link>)
        }
        if (this.props.numberOfArticles > this.props.params.page * 10) {
            links.push(<Link key="next" onClick={this.nextPage.bind(this)} to={`/news/archive/${currentPage+1}`}>Next</Link>)
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