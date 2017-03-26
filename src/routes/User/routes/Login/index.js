import React from 'react';
import { ReduxWrapper } from '../../../../wrappers';
import { authorizeUser } from '../../../../actions/authActions';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: {},
            isLoading: false,
        }
    }
    submit(e) {
        e.preventDefault();
        this.setState({
            errors: {},
            isLoading: true,
        });
        this.props.authorizeUser({
            username: e.target['username'].value,
            password: e.target['password'].value,
        }).then(res => {
            // Logged in
        }).catch(err => {
            // Not authorized
            this.setState({
                errors: err,
                isLoading: false
            })
        });
    }

    renderLoginForm() {
        const { errors, isLoading } = this.state;
        return(
            <div className="component">
                {errors.form && <div>{errors.form}</div>}
                <form method="post" onSubmit={this.submit.bind(this)} action="/api/auth">
                    <div>
                        <label htmlFor="login-username">Username:</label><br />
                        <input type="text" name="username" id="login-username" />
                    </div>
                    <div>
                        <label htmlFor="login-password">Password:</label><br />
                        <input type="password" name="password" id="login-password" />
                    </div>
                    <input type="submit" value="Login" disabled={isLoading || this.props.user}/>
                </form>
            </div>
        );
    }

    render = () => (
        this.props.user ? <p>You are logged in.</p> : this.renderLoginForm()
    );
}

export default ReduxWrapper(Login, state => ({
    user: state.auth.user,
}), {
    authorizeUser
});
