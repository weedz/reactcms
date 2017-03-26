import React from 'react';
import Stub from './Stub';
import './News.css';

export default class News extends React.Component {
    render() {
        const articles = this.props.articles.map(article => (
            <Stub key={article.id} article={article}/>
        ));
        return(
            <div className="News">
                {articles}
                {this.props.children}
            </div>
        );
    }
}
