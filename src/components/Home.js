import React from 'react';
import './Home.css';

class Home extends React.Component {
    render() {
        return(
            <div className="Home">
                <div className="widgets right">
                    <p>Widgets</p>
                </div>
                <div className="content">
                    <p>Hello?</p>
                </div>
                <div className="clear" />
            </div>
        );
    }
}
module.exports = Home;