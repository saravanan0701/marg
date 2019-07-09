import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import CheckoutAddress from './CheckoutAddress/';
import CheckoutBag from './CheckoutBag/';

class Checkout extends Component {

  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Route exact path="/checkout/" component={CheckoutBag} />
        <Route exact path="/checkout/address/" component={CheckoutAddress} />
      </div>
    )
  }

}

export default Checkout;