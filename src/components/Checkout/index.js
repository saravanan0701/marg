import React, { Component } from 'react';
import { Route } from 'react-router';
import { Row, Col } from 'reactstrap';
import CheckoutSidebar from './CheckoutSidebar/';
import CheckoutAddress from './CheckoutAddress/';
import CheckoutBag from './CheckoutBag/';
import CheckoutPayment from './CheckoutPayment/';

class Checkout extends Component {

  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    return (
      <Row>
         <Col lg="9">
          <Route exact path="/checkout/cart/" component={CheckoutBag} />
          <Route exact path="/checkout/address/" component={CheckoutAddress} />
          <Route exact path="/checkout/payment/" component={CheckoutPayment} />
         </Col>
         <Col lg="3">
            <CheckoutSidebar />
         </Col>
      </Row>
    )
  }

}

export default Checkout;