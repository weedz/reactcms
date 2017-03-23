import React from 'react';

import Relay from 'react-relay';

import Stub from './Stub';
import './News.css';

class News extends React.Component {
    render() {
        const articles = this.props.articles ? this.props.articles.map(({node}) => (
            <Stub key={node.id} article={node}/>
        )) : '';
        return(
            <div className="News">
                {articles}
                {this.props.children}
            </div>
        );
    }
}

export default Relay.createContainer(News, {
        fragments: {
            articles: () => Relay.QL`
                fragment on userArticleConnection {
                    edges {
                        node {
                            intro
                        }
                    }
                }
            `
        }
    }
);