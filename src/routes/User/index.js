import React from 'react';
import { Route } from 'react-router-dom';

import Login from './routes/Login';
import Register from './routes/Register';
import Dashboard from './routes/Dashboard';

// TODO: Should logout be part of dashboard component, make it its own component?
export default class User extends React.Component {
    render = () =>  (
        <div>
            <Route path={`${this.props.match.url}/login`} component={Login}/>
            <Route path={`${this.props.match.url}/register`} component={Register}/>
            <Route path={`${this.props.match.url}/(logout|dashboard)`} component={Dashboard} />
            {/*<Route path={`${this.props.match.url}/dashboard`} component={Dashboard}/>*/}
        </div>
    );
}