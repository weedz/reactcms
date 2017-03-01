import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './App.css';

class AppContainer extends React.Component {
    render() {
        document.title = 'Home';
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
