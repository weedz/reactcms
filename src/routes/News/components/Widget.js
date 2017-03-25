import React from 'react';
import News from './News';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNewsGraphQL } from '../../../actions/newsActions';

import Relay from 'react-relay';

class Widget extends React.Component {

    componentWillMount() {
        //this.props.fetchNewsGraphQL();
    }
    render() {
        return(
            <News articles={this.props.articles}/>
        );
    }
}


export default Relay.createContainer(Widget, {
        fragments: {
            articles: () => Relay.QL`
                fragment on userArticleConnection {
                    ${News.getFragment('articles')}
                }
            `
        }
    }
);