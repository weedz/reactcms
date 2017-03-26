import React from 'react';
import { Route, Link } from 'react-router-dom';
import {ReduxWrapper} from '../../wrappers';
import Archive from './routes/Archive';

/*
 TODO: client side cache to prevent refetch of already fetched data
 */
class Handler extends React.Component {

    constructor(props) {
        super();
        this.state = {
            page: Number(props.match.params.page) || 1
        };
    }

    render() {
        return(
            <div className="component">
                <Route path={`${this.props.match.url}/:cursor?`} component={Archive} />
                {this.props.pageInfo.hasNextPage
                    ? <Link to={`${this.props.match.url}/${this.props.pageInfo.endCursor || ''}`}>Next page</Link>
                    : ''}
            </div>
        );
    }
}
export default ReduxWrapper(Handler, (state) => ({
    pageInfo: state.news.pageInfo,
}));