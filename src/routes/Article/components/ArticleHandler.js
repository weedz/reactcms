import React from 'react';
import Article from './Article';
import './Article.css';

class ArticleHandler extends React.Component {     // Article handler
    constructor(props) {
        super();

        this.state = {
            article: null
        };
        fetch(`/api/news/article/${props.params.articleId}`, {
            method: 'post'
        }).then((res) => {
            return res.json();
        }).then((json) => {
            if (json.length == 1) {
                this.setState({
                    article: <Article article={json[0]}/>
                });
            } else {
                this.setState({
                    article: <p>Article not found</p>
                });
            }
        });
    }
    render() {
        return(
            this.state.article
        );
    }
}
module.exports = ArticleHandler;