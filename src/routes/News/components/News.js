import React from 'react';

import Relay from 'react-relay';

import Stub from './Stub';
import './News.css';

class News extends React.Component {
    render() {
        const articles = this.props.articles ? this.props.articles.edges.map(
            ({node}) => (
                <Stub key={node.__dataID__} article={node} author={node.author}/>
            )
        ) : '';
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
                            ${Stub.getFragment('article')}
                        }
                    }
                }
            `
        }
    }
);