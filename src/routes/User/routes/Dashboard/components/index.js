import React from 'react';
import {ReduxWrapper} from '../../../../../wrappers';

class DashboardIndex extends React.Component {
    render() {
        return(
            <div>
                <h1>Dashboard index</h1>
                <p>User: {this.props.user.username}</p>
            </div>
        );
    }
}

export default ReduxWrapper(DashboardIndex, (state) => ({
    user: state.auth.user,
}));