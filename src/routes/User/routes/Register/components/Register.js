import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newUser } from '../../../../../actions/userActions';

class Register extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            password2: '',
            email: '',
            errors: {
                password: ''
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.newUser({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
        });
    }
    handleOnChange(e) {
        const { value, name } = e.target;

        this.state[name] = value;
        if (this.state.password != this.state.password2) {
            this.state.errors.password = 'Passwords do not match';
        } else {
            this.state.errors.password = '';
        }
        this.forceUpdate();
    }

    render() {
        return(
            <div className="component">
                <p className="alert-danger">{this.props.error}</p>
                <p>{this.props.user.message}</p>
                <form method="post" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label><br />
                        <input type="text" name="username" id="username" onChange={this.handleOnChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label><br />
                        <input type="password" name="password" id="password" onChange={this.handleOnChange} />
                    </div>
                    <div>
                        <label htmlFor="password2">Confirm password:</label><span className="alert-danger">{this.state.errors.password}</span><br />
                        <input type="password" name="password2" id="password2" onChange={this.handleOnChange} />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail:</label><br />
                        <input type="email" name="email" id="email" onChange={this.handleOnChange} />
                    </div>
                    <input type="submit" value="Register" disabled={this.props.fetching} />
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        error: state.user.error,
        fetching: state.user.fetching,
    }
}
function mapDispatchToProps(dispatch) {
    return(bindActionCreators({
        newUser
    }, dispatch));
}

const defaultExport = connect(mapStateToProps, mapDispatchToProps)(Register);
export default defaultExport;
module.exports = defaultExport;