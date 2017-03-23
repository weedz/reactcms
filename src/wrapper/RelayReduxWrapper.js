import ReduxWrapper from './ReduxWrapper';
import RelayWrapper from './RelayWrapper';
import React from 'react';

function wrapper(component, relayFragment = null, mapStateToProps = null, mapDispatchToProps = {}) {
    const reduxComponent = ReduxWrapper(component, mapStateToProps, mapDispatchToProps);
    const relayComponent = RelayWrapper(reduxComponent, relayFragment);
    return relayComponent;
}

export default wrapper;