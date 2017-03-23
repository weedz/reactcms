import React from 'react';
import Relay from 'react-relay';
import WidgetNews from '../routes/News/components/Widget';
import './Home.css';

import { validateToken } from '../actions/userActions';


class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            authorized: false
        }
    }
    checkAuthorized() {
        /*fetch('/api/auth/check', {
            headers: {
                'Authorization': `bearer ${localStorage.getItem('jwtToken')}`,
            }
        }).then(res =>
            res.json()
        ).then(json => {
            this.setState({
                authorized: json.errors ? 'Not authorized' : 'Authorized'
            });
        });*/
        //this.props.validateToken(localStorage.getItem('jwtToken'));
    }
    render() {
        return(
            <div className="component">
                <div className="widgets right">
                    {<WidgetNews articles={this.props.root.edges[0].node.articles} />}
                </div>
                <div className="content">
                    <ul>{
                        this.props.root && this.props.root.edges.map(({node}) => (<li key={node.__dataID__}>{console.log(node)}{node.username}</li>))
                    }</ul>
                    <p>Hello?</p>
                </div>
                <div className="clear" />
            </div>
        );
    }
}

const RelayComponent = Relay.createContainer(Home, {
        fragments: {
            root: () => Relay.QL`
                fragment on UsersConnection {
                    edges {
                        node {
                            username,
                            articles(first:2){
                                ${WidgetNews.getFragment('articles')}
                            }
                        }
                    }
                    
                }
            `
        }
    }
);

class RelayRoute extends Relay.Route {
    static queries = {
        root: () => Relay.QL`query { users }`,
    };
    static routeName = 'RelayRoute';
}

export default () => <Relay.RootContainer
    Component={RelayComponent}
    route={new RelayRoute()}
    renderFetched={data => (<RelayComponent {...data}/>)}
/>


