import React from 'react';
import {ReduxWrapper} from '../../../../../wrappers';

class DashboardSettings extends React.Component {
    render() {
        return(
            <div>
                <h1>Dashboard Settings</h1>
            </div>
        );
    }
}

export default ReduxWrapper(DashboardSettings, (state) => ({
    user: state.auth,
}));