import React from 'react';
import { Link } from 'react-router-dom';

export default class Stub extends React.Component {
    render() {
        return(
            <div className="Stub">
                <h2><Link to={`/article/${this.props.article.id}`}>{this.props.article.title}</Link></h2>
                <small>
                    Author: {this.props.article.author.username} - Published:
                    <time dateTime={this.props.article.createdAt}>
                        {new Date(this.props.article.createdAt).toLocaleString('en-GB')}
                    </time>
                </small>
                <p>{this.props.article.intro}</p>
            </div>
        );
    }
}