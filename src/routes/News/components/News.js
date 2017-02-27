import React from 'react';
import Stub from './Stub';
import './News.css';

export default class News extends React.Component {
    constructor(props) {
        super();
        const page = props.page || props.params.page || 1;
        this.state = {
            articles: [],
            numberOfArticles: 0,
        };
        //console.log('Fetch news from server');
        fetch('/api/news/count').then((res) =>
            res.text()
        ).then((count) => {
            this.setState({
                numberOfArticles: Number(count)
            });
        });
        fetch(`/api/news/${page}`, {
            method: 'post'
        }).then((res) => {
            return res.json();
        }).then((json) => {
            const items = [];
            json.forEach((i) => {
                items[i.id] = <Stub key={i.id} article={i}/>;
            });
            this.setState({
                articles: items
            });
        });
    }

    render() {
        return(
            <div className="News">
                {this.state.articles}
            </div>
        );
    }
}

module.exports = News;