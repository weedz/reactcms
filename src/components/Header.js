import React, { Component } from 'react';
import {Link} from 'react-router';
import './Header.css';

export default class Header extends Component {
    render() {
        const headerItems = [
            {url: '/', body: 'Home'},
            {url: 'news',body: 'News'},
        ];
        return (
            <ul className="Header">
                {
                    headerItems.map((i) =>
                        <Link to={i.url} key={i.url.toString()}><li>{i.body}</li></Link>)
                }
            </ul>
        );
    }
}
