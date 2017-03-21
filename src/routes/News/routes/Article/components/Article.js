import React from 'react';

export default class Article extends React.Component {
    render() {
        return(
            <div className="Article">
                <h1>{this.props.article.title}</h1>
                <small>Author: {this.props.article.user.username} - Published: <time dateTime={this.props.article.createdAt}>{new Date(this.props.article.createdAt).toLocaleString('en-GB')}</time></small>
                <h4 className="intro">{this.props.article.intro}</h4>
                <p>{this.props.article.content}</p>
            </div>
        );
    }
}