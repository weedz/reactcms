import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authorizeUser } from '../../../../../actions/userActions';

class Login extends React.Component {
    submit(e) {
        e.preventDefault();
        this.props.authorizeUser({
            username: e.target['login-username'].value,
            password: e.target['login-password'].value,
        });
    }
    render() {
        let loggedIn = this.props.user ? <p>You are logged in.</p> : '';
        return(
            <div className="component">
                <form method="post" onSubmit={this.submit.bind(this)}>
                    <label htmlFor="login-username">Username:</label>
                    <input type="text" name="login-username" id="login-username" />
                    <label htmlFor="login-password">Password:</label>
                    <input type="password" id="login-password" />
                    <label htmlFor="login-remember">Remember me:</label>
                    <input type="checkbox" id="login-remember" />
                    <input type="submit" value="Login" name="login-submit" />
                </form>
                {loggedIn}
            </div>
        );
    }
}

const defaultExport = connect(state => ({
    user: state.user.user,
}), dispatch => (
    bindActionCreators({
        authorizeUser,
    }, dispatch)
))(Login);

export default defaultExport;
module.exports = defaultExport;