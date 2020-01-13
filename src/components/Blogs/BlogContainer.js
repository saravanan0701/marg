import { connect } from 'react-redux'
import actions from '../../actions'
import Blog from './BlogPost.jsx'


const mapStateToProps = ({
  blog : {
    currentIndex,
    tab,
    view_more,
    data
  }
}, ownProps) => ({
  currentIndex,
  tab,
  view_more,
  data
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleCurrentIndex: (filter) => dispatch(actions.handleCurrentIndex(filter))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);
