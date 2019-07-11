import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
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
      <div>
        <Route exact path="/checkout/" component={CheckoutBag} />
        <Route exact path="/checkout/address/" component={CheckoutAddress} />
        <Route exact path="/checkout/payment/" component={CheckoutPayment} />
      </div>
    )
  }

}

export default Checkout;