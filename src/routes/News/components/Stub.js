import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router-dom';

class Stub extends React.Component {
    render() {
        return(
            <div className="Stub">
                <h2><Link to={'/news/article/' +this.props.article._id}>{this.props.article.title}</Link></h2>
                <small>Author: {this.props.article.author.username} - Published: <time dateTime={this.props.article.createdAt}>{new Date(this.props.article.createdAt).toLocaleString('en-GB')}</time></small>
                <p>{this.props.article.intro}</p>
            </div>
        );
    }
}
export default Relay.createContainer(Stub, {
        fragments: {
            article: () => Relay.QL`
                fragment on news {
                    title,
                    intro,
                    id
                    author {
                        username,
                        id
                    }
                }
            `
        }
    }
);