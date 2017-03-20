import React from 'react';
import { Route } from 'react-router-dom';

import Login from './routes/Login';
import Register from './routes/Register';
import Dashboard from './routes/Dashboard';

export default class User extends React.Component {
    render = () => {
        console.log(Login);
        return (
            <div>
                <Route path={`${this.props.match.url}/login`} component={Login}/>
                <Route path={`${this.props.match.url}/register`} component={Register}/>
                <Route path={`${this.props.match.url}/dashboard/:action?`} component={Dashboard}/>
            </div>
        )
    }
}