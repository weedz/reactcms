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
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
    }
    handleOnChange(e) {

    }

    render() {
        return(
            <div className="component">
                <form method="post" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" id="username" />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <div>
                        <label htmlFor="password2">Confirm password:</label>
                        <input type="password" name="password2" id="password2" />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <input type="submit" value="Register" />
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        error: state.user.error
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