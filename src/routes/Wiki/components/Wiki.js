import React from 'react';

class Wiki extends React.Component {
    render() {
        document.title = 'Wiki';
        return(
            <div className="component">
                <p>Wiki</p>
            </div>
        );
    }
}
module.exports = Wiki;