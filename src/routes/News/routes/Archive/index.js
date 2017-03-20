import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import News from '../../components/News';
import { fetchNews, fetchNewsCount } from '../../../../actions/newsActions';


class Archive extends React.Component {

    constructor(props) {
        super();
        this.state = {
            page: Number(props.match.params.page) || 1
        };
    }

    componentWillMount() {
        this.updateArchive();
    }
    componentDidUpdate() {
        const currentPage = Number(this.props.match.params.page);
        if (isNaN(currentPage) && this.props.children) {

        } else if (isNaN(currentPage) && this.state.page !== 1) {
            this.state.page = 1;
            this.updateArchive();
        } else if (!isNaN(currentPage) && this.state.page !== currentPage) {
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
        if (this.props.match.params.page > 1 && this.props.articles.length > 0) {
            links.push(<Link key="prev" to={`/news/archive/${currentPage-1}`}>Previous</Link>)
        }
        if (this.props.numberOfArticles > this.props.match.params.page * 10) {
            links.push(<Link key="next" to={`/news/archive/${currentPage+1}`}>Next</Link>)
        }
        if (this.props.articles.length === 0) {
            links.push(<Link key="news" to={`${this.props.match.url}`}>News</Link>);
        } else if (this.props.match.params.page === undefined) {
            links.push(<Link key="archive" to={`${this.props.match.url}/archive/2`}>Archive</Link>);
        }

        return (
            <div>
                <News articles={this.props.articles}/>
                {links}
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
))(Archive);

export default defaultExport;