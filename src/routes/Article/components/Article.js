import React from 'react';
import './Article.css';

class Article extends React.Component {     // Article handler
    render() {
        return(
            <div className="Article">
                <h2>{this.props.article.title}</h2>
                <p>{this.props.article.content}</p>
            </div>
        );
    }
}
module.exports = Article;