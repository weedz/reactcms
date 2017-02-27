import React from 'react';
import News from './News';
import Stub from './Stub';

export default class Widget extends React.Component {

    constructor() {
        super();
        this.state = {
            articles: [],
        };
    }
    componentWillMount() {
        fetch('/api/news/archive/1').then((res) => {
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
            <News articles={this.state.articles}/>
        );
    }
}