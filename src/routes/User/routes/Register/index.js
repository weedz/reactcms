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
        user: state.auth.user,
        error: state.auth.error
    }
}

const defaultExport = connect(mapStateToProps)(Register);
export default defaultExport;
