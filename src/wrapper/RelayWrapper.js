import React from 'react';
import Relay from 'react-relay';

function wrapper(component, fragments) {
    const Container = Relay.createContainer(component, {
        fragments: {
            root: () => fragments.fragment,
        }
    });

    return Container;

}
export default wrapper;