import React from 'react';

export default class Article extends React.Component {
    render() {
        return(
            <div className="Article">
                <h1>{this.props.article.title}</h1>
                <h4 className="intro">{this.props.article.intro}</h4>
                <p>{this.props.article.content}</p>
            </div>
        );
    }
}