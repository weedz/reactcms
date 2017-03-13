import React, { Component } from 'react';
import {Link} from 'react-router';

import { connect } from 'react-redux';

import './Header.css';

class Header extends Component {
    render() {
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
                            <Link to="/user/login"><li>Login</li></Link>
                            <Link to="/user/register"><li>Register</li></Link>
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

const defaultExport = connect(state => ({
    user: state.user
}))(Header);

export default defaultExport;