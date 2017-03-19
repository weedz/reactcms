import React from 'react';
import Stub from './Stub';
import './News.css';

export default class News extends React.Component {
    constructor() {
        super();
        console.log("News.js");
    }
    render() {
        const articles = this.props.articles.map(article => (
            <Stub key={article.id} article={article}/>
        ));
        return(
            <div className="News">
                <p>News</p>
                {articles}
                {this.props.children}
            </div>
        );
    }
}

module.exports = News;