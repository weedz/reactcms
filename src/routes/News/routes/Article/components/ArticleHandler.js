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
        return(
            <Article article={this.props.article}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        article: state.article.article,
        lastFetch: state.article.lastFetch
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchArticle
    }, dispatch);
}
const defaultExport = connect(mapStateToProps, matchDispatchToProps)(ArticleHandler);

export default defaultExport;
module.exports = defaultExport;