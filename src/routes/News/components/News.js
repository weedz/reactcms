import React from 'react';
import Stub from './Stub';
import './News.css';

export default class News extends React.Component {
        render() {
        return(
            <div className="News">
                {this.props.articles.map(article => (
                    <Stub key={article.id} article={article}/>
                ))}
                {this.props.children}
            </div>
        );
    }
}

module.exports = News;