import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './App.css';

export default class App extends React.Component {
    render() {
        document.title = 'Home';
        return (
            <div className="App">
                <Header />
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}
