import { connect } from 'react-redux'
import actions from '../../actions'
import ProductList from './ProductList'


const mapStateToProps = ({
  productList: {	
    filter: {	
      editors,	
      attributes,
      canDehyderateUrl,
    }	
  }
}, ownProps) => ({
  canDehyderateUrl,
  selectedEditors: editors,	
  selectedAttributes: attributes,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetAllFilters: (filter) => dispatch(actions.resetAllFilters(filter)), 
    addFilter: (filter) => dispatch(actions.addAttributeFilter(filter)),
    addEditor: (editor) => dispatch(actions.addEditorFilter(editor)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);