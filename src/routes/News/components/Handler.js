import React from 'react';
import News from './News';
import Stub from './Stub';
import { Link } from 'react-router';

class Handler extends React.Component {

    constructor(props) {
        super();
        this.state = {
            articles: [],
            numberOfArticles: 0,
            page: Number(props.params.page) || 1
        };
    }
    componentWillMount() {
        fetch('/api/news/count').then((res) =>
            res.text()
        ).then((count) => {
            this.setState({
                numberOfArticles: Number(count)
            });
        });
        this.updateArchive();
    }

    updateArchive() {
        fetch(`/api/news/archive/${this.state.page}`).then((res) => {
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
    nextPage() {
        this.state.page += 1;
        this.updateArchive();
    }
    prevPage() {
        this.state.page -= 1;
        this.updateArchive();
    }

    render() {
        if (this.props.params.page === undefined && this.props.params.id === undefined && this.state.page != 1) {
            this.state.page = 1;
            this.updateArchive();
        }
        const currentPage = Number(this.props.params.page);
        const links = [];
        if (this.props.params.page > 1) {
            links.push(<Link key="prev" onClick={this.prevPage.bind(this)} to={`/news/archive/${currentPage-1}`}>Previous</Link>)
        }
        if (this.state.numberOfArticles > this.props.params.page * 10) {
            links.push(<Link key="next" onClick={this.nextPage.bind(this)} to={`/news/archive/${currentPage+1}`}>Next</Link>)
        }
        if (this.props.params.page === undefined) {
            links.push(<Link key="archive" to="/news/archive/1">Archive</Link>);
        }
        const content = this.props.children ||
            <News articles={this.state.articles}/>;
        return(
            <div className="component">
                {content}
                <div>
                {links}
                </div>
            </div>
        );
    }
}
module.exports = Handler;