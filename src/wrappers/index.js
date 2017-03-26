import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export function ReduxWrapper(component, stateToProps = null, dispatchToProps = {}) {
    return connect(stateToProps, (dispatch => (
        bindActionCreators(dispatchToProps, dispatch)
    )))(component);
}