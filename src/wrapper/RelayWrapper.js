import React from 'react';
import Relay from 'react-relay';

import relayRouteWrapper from './RelayRouteWrapper';

function wrapper(component, fragments, route) {
    /*class RelayRoute extends Relay.Route {
        static queries = {
            [fragments.key]: () => Relay.QL`query { root }`
        };
        static queries = {
            [fragments.key]: (Component, params) => Relay.QL`
                query {
                    users {
                        ${Component.getFragment(fragments.key,params)}
                    }
                }
            `
        };
        static routeName = 'RelayRoute';
    }*/

    const Container = Relay.createContainer(component, {
        fragments: {
            [fragments.key]: () => fragments.fragment
        }
    });
    const relayRoute = relayRouteWrapper({
        [fragments.key]:() => Relay.QL`query {
            users
        }`
    });
    const relayComponent = ({currentParams}) => (
        <Relay.Renderer
            Container={Container}
            queryConfig={new relayRoute(currentParams)}
            environment={Relay.Store}
            render={({props}) => {
                if (props) {
                    return <Container {...props} />
                } else {
                    return <p>Loading...</p>
                }
            }}
        />
    );
    return relayComponent;

}
export default wrapper;