import React from 'react';
import Relay from 'react-relay';
import WidgetNews from '../routes/News/components/Widget';
import './Home.css';

import { validateToken } from '../actions/userActions';

import wrapper from '../wrapper/RelayReduxWrapper';

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
        this.props.validateToken(localStorage.getItem('jwtToken'));
    }
    render() {
        return(
            <div className="component">
                <div className="widgets right">
                    <WidgetNews/>
                </div>
                <div className="content">
                    <ul>{
                        this.props.users.edges.map(({node}) => (<li key={node.__dataID__}>{node.username}</li>))
                    }</ul>
                    <p>Hello?</p>
                    <input type="button" value="Authorized?" onClick={this.checkAuthorized.bind(this)}/>
                    <p>{this.state.authorized || this.props.user.user ? 'Authorized' : ''}</p>
                </div>
                <div className="clear" />
            </div>
        );
    }
}

export default wrapper(Home, {
        key: 'users',
        fragment: Relay.QL`
            fragment on UsersConnection {
                    edges {
                        node {
                            username
                            _id
                        }
                    }
            }
        `
    },
    (state) => ({
        user: state.user
    }),
    {
        validateToken
    }
);