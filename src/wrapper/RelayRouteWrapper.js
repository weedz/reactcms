import Relay from 'react-relay';
import React from 'react';
import ReduxWrapper from './ReduxWrapper';
import RelayWrapper from './RelayWrapper';

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

function route(queries, name = 'RelayRoute2') {
    console.log(queries);
    return class RelayRoute extends Relay.Route {
        static queries = {
            users: () => Relay.QL`query {
                users
            }`
        };
        static routeName = name;
    }
}


function wrapper(component, relayFragment = null, mapStateToProps = [], mapDispatchToProps = {}) {
    const ReduxComponent = ReduxWrapper(component, mapStateToProps, mapDispatchToProps);
    const RelayContainer = RelayWrapper(ReduxComponent, relayFragment);

    /*const relayRoute = route({
        [relayFragment.key]:() => Relay.QL`query {
            users
        }`,
        articles:() => Relay.QL`query {
            articles
        }`
    });*/
    class RelayRoute extends Relay.Route {
        static queries = {
            root: () => Relay.QL`query { root }`
        };
        static routeName = 'RelayRoute';
    }

    const relayComponent = ({currentParams}) => (
        <Relay.RootContainer
            Component={RelayContainer}
            route={new RelayRoute()}
        />
    );
    return relayComponent;
}

export default wrapper;