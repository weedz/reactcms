import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authorizeUser } from '../../../../../actions/userActions';

class Login extends React.Component {
    render() {
        return(
            <div className="component">
                <p>Login form placeholder</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
    }
}
function mapDispatchToProps(dispatch) {
    return(bindActionCreators({
        authorizeUser
    }, dispatch));
}
const defaultExport = connect(mapStateToProps, mapDispatchToProps)(Login);
export default defaultExport;
module.exports = defaultExport;