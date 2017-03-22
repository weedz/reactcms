import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function wrapper(component, mapStateToProps, mapDispatchToProps) {
    return connect(
        mapStateToProps,
        dispatch => (
            bindActionCreators(mapDispatchToProps, dispatch)
        )
    )(component);
}

export default wrapper;