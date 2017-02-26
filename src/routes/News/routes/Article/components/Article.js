import React from 'react';
class Article extends React.Component {
    render() {
        console.log('Article');
        return(
            <div className="Article">
                {this.props.children}
            </div>
        );
    }
}
module.exports = Article;