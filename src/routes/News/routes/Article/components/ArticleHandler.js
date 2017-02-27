import React from 'react';
import Article from './Article';

class ArticleHandler extends React.Component {
    constructor() {
        super();
        this.state = {
            article: null
        };
    }

    componentWillMount() {
        fetch(`/api/news/article/${this.props.params.id}`).then((res) => {
            return res.json();
        }).then((json) => {
            if (json.length == 1) {
                this.setState({
                    article: <Article article={json[0]}/>
                });
            } else {
                this.setState({
                    article: <p>Article not found</p>
                });
            }
        });
    }

    render() {
        return(
            this.state.article
        );
    }
}
module.exports = ArticleHandler;