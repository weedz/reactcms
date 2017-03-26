import React from 'react';
import { ReduxWrapper } from '../../../../wrappers';
import { fetchNewsGraphQL } from '../../../../actions/newsActions';
import News from '../../components/News';


class Archive extends React.Component {

    constructor(props) {
        super();
        this.state = {
            cursor: props.match.params.cursor
        }
    }

    componentWillMount() {
        this.updateArchive();
    }
    componentDidUpdate() {
        if (this.state.cursor !== this.props.match.params.cursor) {
            this.state.cursor = this.props.match.params.cursor;
            this.updateArchive();
        }
    }

    updateArchive() {
        this.props.fetchNewsGraphQL(this.props.match.params.cursor || '');
    }

    render() {
        return (
            <News articles={this.props.articles}/>
        );
    }
}

export default ReduxWrapper(Archive, (state) => ({
    articles: state.news.articles,
    pageInfo: state.news.pageInfo,
}), {
    fetchNewsGraphQL
});