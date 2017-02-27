import React from 'react';
import './News.css';

export default class News extends React.Component {
        render() {
        return(
            <div className="News">
                {this.props.articles}
                {this.props.children}
            </div>
        );
    }
}

module.exports = News;