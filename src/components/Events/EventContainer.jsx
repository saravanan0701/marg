import { connect } from 'react-redux'
import actions from '../../actions'
import Events from './Events.jsx'


const mapStateToProps = ({
  events : {
    data,
    next_event,
    past_event,
    next_view_more,
    past_view_more
  }
}, ownProps) => ({
  data,
  next_event,
  past_event,
  next_view_more,
  past_view_more
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleNext: () => dispatch(actions.toggleNext()),
    togglePast: () => dispatch(actions.togglePast()),
    onNext: () => dispatch(actions.onNext()),
    onPast: () => dispatch(actions.onPast()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
