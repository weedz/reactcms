import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logout } from '../../../../actions/userActions';

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

const defaultExport = connect(state => ({
    user: state.user
}), dispatch => (
    bindActionCreators({
        logout
    },dispatch)
))(Dashboard);
export default defaultExport;
module.exports = defaultExport;