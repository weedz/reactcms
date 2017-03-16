import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './App.css';

export default class AppContainer extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="app-container">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}
module.exports = AppContainer;
