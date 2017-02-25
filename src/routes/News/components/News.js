import React from 'react';
import Stub from './Stub';
import './News.css';

class News extends React.Component {
    constructor() {
        super();
        this.state = {
            articles: []
        };
        const _this = this;
        fetch('/api/news/0', {
            method: 'post'
        }).then((res) => {
            return res.json();
        }).then((json) => {
            const items = [];
            json.forEach((i) => {
                items[i.id] = <Stub key={i.id} article={i}/>;
            });
            _this.setState({
                articles: items
            });
        });
    }
    render() {
        document.title = 'News';
        return(
            <ul className="News">
                {this.state.articles}
            </ul>
        );
    }
}

module.exports = News;