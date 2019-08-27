import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router';
import ProductCard from './ProductCard'

const mapStateToProps = ({
  auth: {
    currency,
  }
}, ownProps) => ({
  currency,
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withApollo(ProductCard)));