import React from 'react';
import WidgetNews from '../routes/News/components/Widget';
import './Home.css';

class Home extends React.Component {
    render() {
        return(
            <div className="component">
                <div className="widgets right">
                    <WidgetNews/>
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