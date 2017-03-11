import React from 'react';
import WidgetNews from '../routes/News/components/Widget';
import './Home.css';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            authorized: false
        }
    }
    checkAuthorized() {
        fetch('/api/auth/check', {
            credentials: 'same-origin',
        }).then(res => {
            res.json();
        }).then(json => {
            console.log(json);
            this.setState({
                authorized: 'Authorized'
            })
        });
    }
    render() {
        return(
            <div className="component">
                <div className="widgets right">
                    <WidgetNews/>
                </div>
                <div className="content">
                    <p>Hello?</p>
                    <input type="button" value="Authorized?" onClick={this.checkAuthorized.bind(this)}/>
                    <p>{this.state.authorized}</p>
                </div>
                <div className="clear" />
            </div>
        );
    }
}
module.exports = Home;