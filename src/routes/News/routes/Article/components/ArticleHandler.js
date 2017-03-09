import React from 'react';
import Article from './Article';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchArticle } from '../../../../../actions/articleActions';

class ArticleHandler extends React.Component {

    componentWillMount() {
        if (this.props.article && this.props.params.articleId == this.props.article.id) {

        } else {
            this.props.fetchArticle(this.props.params.articleId);
        }
    }

    render() {
        let content;
        if (this.props.fetching) {
            content = <p>Loading article...</p>
        } else if (Object.keys(this.props.article).length > 0) {
            content = <Article article={this.props.article}/>
        } else {
            content = <p>Article not found.</p>
        }
        return(
            <div>
            {content}
            </div>
        );
    }
}

const defaultExport = connect((state) => ({
    article: state.article.article,
    lastFetch: state.article.lastFetch,
    fetching: state.article.fetching
}), (dispatch) => (
    bindActionCreators({
        fetchArticle
    }, dispatch)
))(ArticleHandler);

export default defaultExport;
module.exports = defaultExport;