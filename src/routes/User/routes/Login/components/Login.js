import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authorizeUser } from '../../../../../actions/userActions';

class Login extends React.Component {
    submit(e) {
        e.preventDefault();
        this.props.authorizeUser({
            username: e.target['username'].value,
            password: e.target['password'].value,
        });
    }
    render() {
        let loggedIn = this.props.user ? <p>You are logged in.</p> : '';
        return(
            <div className="component">
                <form method="post" onSubmit={this.submit.bind(this)} action="/api/auth">
                    <label htmlFor="login-username">Username:</label>
                    <input type="text" name="username" id="login-username" />
                    <label htmlFor="login-password">Password:</label>
                    <input type="password" name="password" id="login-password" />
                    <label htmlFor="login-remember">Remember me:</label>
                    <input type="checkbox" name="remember" id="login-remember" />
                    <input type="submit" value="Login" />
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