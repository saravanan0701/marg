import React, { Component } from 'react';
import { Route } from 'react-router';
import { Row, Col } from 'reactstrap';
import CheckoutSidebar from './CheckoutSidebar/';
import CheckoutAddress from './CheckoutAddress/';
import CheckoutBag from './CheckoutBag/';
import CheckoutPayment from './CheckoutPayment/';
import CheckoutResult from './CheckoutResult/';

class Checkout extends Component {

  constructor(props){
    super(props);
    this.state = {
      checkoutResult: null,
      orderID: null
    };
    this.setCheckoutStatus = this.setCheckoutStatus.bind(this);
  }

  setCheckoutStatus = (result, orderID) => {
    this.setState({
      checkoutResult: result,
      orderID: orderID
    })
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }

  render() {

    if (this.state.checkoutResult == null) {
      return (
        <Row className="my-5">
          <Col lg="9">
            <Route exact path="/checkout/cart/" component={CheckoutBag} />
            <Route exact path="/checkout/address/" component={CheckoutAddress} />
          </Col>
          <Col lg="3">
              <CheckoutSidebar setCheckoutStatus={this.setCheckoutStatus}/>
          </Col>
        </Row>
      )
    } else {
      return <CheckoutResult orderID={this.state.orderID}/>
    }
  }

}

export default Checkout;