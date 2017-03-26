import React from 'react';
import { Route, Link } from 'react-router-dom';
import {ReduxWrapper} from '../../../../wrappers';
import { logout } from '../../../../actions/authActions';

// Routes
import DashboardIndex from './components/index';
import DashboardSettings from './components/Settings';

class Dashboard extends React.Component {
    componentWillMount() {
        if (this.props.match.url.includes('logout') && this.props.user.user) {
            this.props.logout();
        }
    }
    componentDidUpdate() {
        if (this.props.match.url.includes('logout') && this.props.user.user) {
            this.props.logout();
        }
    }
    renderDashboard = () => (
        <div>
            <div style={{
                float:'left',
                margin: '0 5px',
                padding: '11px',
            }}>
                <ul>
                    <li><Link to={this.props.match.url}>Dashboard</Link></li>
                    <li><Link to={`${this.props.match.url}/settings`}>Settings</Link></li>
                </ul>
            </div>
            <Route exact path={`${this.props.match.url}`} component={DashboardIndex} />
            <Route path={`${this.props.match.url}/settings`} component={DashboardSettings} />
        </div>
    );

    renderNotAuthorized = () => (
        <p>You are not logged in.</p>
    );

    render = () => (
        this.props.user.user ? this.renderDashboard() : this.renderNotAuthorized()
    );
}

export default ReduxWrapper(Dashboard, state => ({
    user: state.auth
}), {
    logout
});
