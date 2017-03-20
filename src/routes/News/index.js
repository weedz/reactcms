import React from 'react';
import { Route } from 'react-router-dom';

import Archive from './routes/Archive';
import Article from './routes/Article';


/*
 TODO: client side cache to prevent refetch of already fetched data
 */
export default class Handler extends React.Component {

    constructor(props) {
        super();
        this.state = {
            page: Number(props.match.params.page) || 1
        };
    }

    render() {
        return(
            <div className="component">
                <Route exact path={`${this.props.match.url}`} component={Archive} />
                <Route path={`${this.props.match.url}/archive/:page`} component={Archive} />
                <Route path={`${this.props.match.url}/article/:articleId`} component={Article} />
            </div>
        );
    }
}