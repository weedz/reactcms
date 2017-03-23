import React from 'react';
import WidgetNews from '../routes/News/components/Widget';
import './Home.css';

import wrapper from '../wrappers/ReduxWrapper';
import { getUsers, getUsersGraphQL } from '../actions/usersActions';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            authorized: false
        }
        this.checkAuthorized = this.checkAuthorized.bind(this);
        this.onclickGetUserList = this.onclickGetUserList.bind(this);
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