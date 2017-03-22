import Relay from 'react-relay';

function wrapper(
    queries = {
        root:() => Relay.QL`query{root}`
    },
    name = 'RelayRoute') {
    return class RelayRoute extends Relay.Route {
        static queries = queries;
        static routeName = name;
    }
}

export default wrapper;