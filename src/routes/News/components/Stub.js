import React from 'react';
import {Link} from 'react-router';

export default class Stub extends React.Component {
    render() {
        return(
            <div className="Stub">
                <h2><Link to={'/news/article/' +this.props.article.id}>{this.props.article.title}</Link></h2>
                <p>{this.props.article.intro}</p>
            </div>
        );
    }
}