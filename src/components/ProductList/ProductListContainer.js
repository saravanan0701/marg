import { connect } from 'react-redux'
import actions from '../../actions'
import ProductList from './ProductList'


const mapStateToProps = ({
}, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetAllFilters: (filter) => dispatch(actions.resetAllFilters(filter)), 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);