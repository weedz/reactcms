import { connect } from 'react-redux';
import TestNews from './TestNews';
import { toggleNews } from '../../../actions/newsActions';


const getVisibleNews = (news, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return news;
    }
};

const mapStateToProps = (state) => {
    return {
        news: getVisibleNews(state.news, 'SHOW_ALL')
    }
};

const mapDispatchToProps = (dispath) => {
    return {
        onNewsClick: (id) => {
            dispath(toggleNews(id))
        }
    }
};

const VisibleNewsList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TestNews);

export default VisibleNewsList