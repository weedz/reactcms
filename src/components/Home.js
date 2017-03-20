import React from 'react';
import WidgetNews from '../routes/News/components/Widget';
import './Home.css';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            authorized: false
        }
    }
    checkAuthorized() {
        fetch('/api/auth/check', {
            headers: {
                'Authorization': `bearer ${localStorage.getItem('jwtToken')}`,
            }
        }).then(res =>
            res.json()
        ).then(json => {
            this.setState({
                authorized: json.errors ? 'Not authorized' : 'Authorized'
            });
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