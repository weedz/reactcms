import React from 'react';
import {ReduxWrapper} from '../../../../wrappers';

import { logout } from '../../../../actions/authActions';

class Dashboard extends React.Component {
    componentWillMount() {
        if (this.props.match.params.action === 'logout' && this.props.user.user) {
            this.props.logout();
        }
    }
    componentDidUpdate() {
        if (this.props.match.params.action === 'logout' && this.props.user.user) {
            this.props.logout();
        }
    }
    renderDashboard() {
        return (
            <p>{this.props.user.user.username} Dashboard</p>
        );
    }
    renderNotAuthorized() {
        return(
            <p>You are not logged in.</p>
        );
    }

    render() {
        const content = this.props.user.user ? this.renderDashboard() : this.renderNotAuthorized();
        return(
            <div>
                {content}
            </div>
        );
    }
}

export default ReduxWrapper(Dashboard, state => ({
    user: state.auth
}), {
    logout
});
