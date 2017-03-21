import React from 'react';
import Article from './components/Article';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchArticleGraphQL } from '../../../../actions/articleActions';

class ArticleHandler extends React.Component {

    componentWillMount() {
        if (this.props.article && this.props.match.params.articleId === this.props.article.id) {

        } else {
            this.props.fetchArticleGraphQL(this.props.match.params.articleId);
        }
    }

    render() {
        let content;
        if (this.props.fetching) {
            content = <p>Loading article...</p>
        } else if (this.props.article && Object.keys(this.props.article).length > 0) {
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
        fetchArticleGraphQL
    }, dispatch)
))(ArticleHandler);

export default defaultExport;