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
        this.showArticles = this.showArticles.bind(this);
    }

    showArticles(evt) {
        console.log(evt.target);
    }

    render() {
        return(
            <div className="component">
                <WidgetNews articles={this.props.root.edges[0].node.articles} />
                <div className="content">
                    <ul>{this.props.root && this.props.root.edges.map(
                        ({node}) => (
                            <li key={node.__dataID__} onClick={this.showArticles}>{node.username}</li>
                        )
                    )}</ul>
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


