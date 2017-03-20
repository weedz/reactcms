import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newUser } from '../../../../actions/userActions';

class Register extends React.Component {
    render() {
        return(
            <div className="component">
                <p>Register form placeholder</p>
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