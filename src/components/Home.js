import React from 'react';
import WidgetNews from '../routes/News/components/Widget';
import './Home.css';

import wrapper from '../wrappers/ReduxWrapper';
import { graphqlFetch } from '../actions/helpers';
import { getUsers, getUsersGraphQL } from '../actions/usersActions';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            authorized: false
        };
        this.checkAuthorized = this.checkAuthorized.bind(this);
        this.onclickGetUserList = this.onclickGetUserList.bind(this);
    }

    graphqlTest() {
        const query = `
            query ($userId:Int) {
              user(id:$userId) {
                id,
                ...FUser,
              }
            }
            
            fragment FArticles on Article {
              id,
            }
            
            fragment FUser on User {
              username,
              articles {
                ...FArticles,
              }
            }`;
        graphqlFetch(query, {
            userId: 2
        }).then(res => res.json()).then(json => {
            console.log(json);
        });
    }

    checkAuthorized() {
        fetch('/api/auth/check', {
            headers: {
                'Authorization': `bearer ${localStorage.getItem('jwtToken')}`,
            }
        }).then(res =>
            res.json()
        ).then(json => {
            this.setState({
                authorized: json.errors ? 'Not authorized' : 'Authorized'
            });
        });
    }
    onclickGetUserList() {
        this.props.getUsersGraphQL();
    }

    render() {
        return(
            <div className="component">
                <div className="widgets right">
                    <WidgetNews/>
                </div>
                <div className="content">
                    <p>Hello?</p>
                    <input type="button" value="GraphQL" onClick={this.graphqlTest.bind(this)} />
                    <div>
                        <input type="button" value="Authorized?" onClick={this.checkAuthorized}/>
                        <p>{this.state.authorized}</p>
                    </div>
                    <div>
                        <input type="button" value="Get user list" onClick={this.onclickGetUserList}/>
                        <p>{this.props.users.error}</p>
                        <ul>{this.props.users.users.map(user => <li key={user.id}>{user.username}</li>)}</ul>
                    </div>
                </div>
                <div className="clear" />
            </div>
        );
    }
}
export default wrapper(Home,(state) => ({
    users: state.users
}), {
    getUsers,getUsersGraphQL
})