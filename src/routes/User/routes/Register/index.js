import React from 'react';
import { connect } from 'react-redux';

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

const defaultExport = connect(mapStateToProps)(Register);
export default defaultExport;
