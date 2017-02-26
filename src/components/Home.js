import React from 'react';
import WidgetNews from '../routes/News/components/News';
import './Home.css';

class Home extends React.Component {
    render() {
        return(
            <div className="Home">
                <div className="widgets right">
                    <WidgetNews page={1}/>
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