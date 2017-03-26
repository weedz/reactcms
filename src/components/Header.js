import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import wrapper from '../wrappers/ReduxWrapper';

import './Header.css';

class Header extends Component {
    render() {
        const userItems = [];
        if (this.props.user.user) {
            userItems.push(<Link key="dashboard" to="/user/dashboard/">Dashboard</Link>);
            userItems.push(<Link key="logout" to="/user/dashboard/logout">Logout</Link>);
        } else {
            userItems.push(<Link key="login" to="/user/login"><li>Login</li></Link>);
            userItems.push(<Link key="register" to="/user/register"><li>Register</li></Link>);
        }
        return (
            <nav className="Header">
                <div className="container">
                    <div className="eoa">
                        <ul>
                            <Link to="/"><li>Home</li></Link>
                            <Link to="/news"><li>News</li></Link>
                            <Link to="/wiki"><li>Wiki</li></Link>
                        </ul>
                    </div>
                    <div className="user-menu">
                        <ul>
                            {userItems}
                        </ul>
                    </div>
                    <div className="search-bar">
                        <form action="search" method="post" id="nav-search">
                            <select name="content">
                                <option value="forum">Forum</option>
                                <option value="news">News</option>
                                <option value="wiki">Wiki</option>
                            </select>
                            <input type="text" minLength="3" name="searchquerry" required="true"/>
                            <input type="submit" value="Search"/>
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
}

export default wrapper(Header, (state) => ({
    user: state.auth
}));