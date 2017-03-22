import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function wrapper(component, mapStateToProps, mapDispatchToProps) {
    return connect(
        (state) => mapStateToProps.reduce(function(map, obj) {
            map[obj] = state[obj];
            return map;
        }, {}),
        dispatch => (
            bindActionCreators(mapDispatchToProps, dispatch)
        )
    )(component);
}

export default wrapper;