import React from 'react';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
    render() {
        document.title = 'Home';
        return (
            <div className="App">
                <Header />
                <div className="app-container">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}
module.exports = App;
