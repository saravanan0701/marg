import React, { Component } from 'react'
import gql from 'graphql-tag';
import { RaisedButton } from './../../commons/';

const SAVE_PAYMENT = gql`
  mutation SavePayment($checkoutId: ID!, $input: PaymentInput!) {
    checkoutPaymentCreate(checkoutId: $checkoutId, input: $input){
      errors{
        field
        message
      }
      checkout{
        id
      }
    }
  }
`

const COMPLETE_CHECKOUT = gql`
  mutation CompleteCheckout($checkoutId: ID!) {
    checkoutComplete(checkoutId: $checkoutId) {
      errors{
        field
        message
      }
      order {
        id
      }
    }
  }
`

export default class CheckoutPayment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "",
      //PAYMENT_STARTED, PAYMENT_SUCCESS, PAYMENT_FAILURE, PAYMENT_PERSISTED, PAYMENT_PERSISTENCE_FAILURE
    }

    this.initiatePayment = this.initiatePayment.bind(this);
  }

  componentDidMount() {
    const self = this;
    this.options = {
      "key": "rzp_test_cP0b0TIREwm6li",
      //TODO: use this in .env file.
      "name": "Acme Corp",
      "image": "https://example.com/your_logo",
      "handler": function (response){
        if(response.razorpay_payment_id) {
          self.setState({
            status: "PAYMENT_SUCCESS",
          });
          return self.persistPayment(response.razorpay_payment_id);
        }
        this.setState({
          status: "PAYMENT_FAILURE",
        });
      },
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com"
      },
      "theme": {
          "color": "#F37254"
      }
    };
  }

  initiatePayment() {
    const {
      cart: {
        totalPrice: {
          net: {
            amount,
            currency,
          },
        },
      },
    } = this.props;
    this.options.currency = currency;
    this.options.amount = amount * 100;
    const razpay = new window.Razorpay(this.options);
    razpay.open();
    this.setState({
      status: "PAYMENT_STARTED",
    });
  }

  persistPayment(paymentId) {
    const self = this;
    const {
      client,
      cart: {
        checkoutId,
        shippingAddress,
        // TODO: use this.
        totalPrice: {
          net: {
            amount,
          },
        },
      },
    } = this.props;
    client.mutate({
      mutation: SAVE_PAYMENT,
      variables: {
        checkoutId,
        input: {
          gateway: "RAZORPAY",
          token: paymentId,
          amount,
        }
      }
    }).then(
      () => {
        self.setState({
          status: "PAYMENT_SUCCESS"
        });
        self.completeCheckout();
      }
    )
  }

  completeCheckout() {
    const self = this;
    const {
      client,
      cart: {
        checkoutId,
      },
      resetCart,
    } = this.props;
    client.mutate({
      mutation: COMPLETE_CHECKOUT,
      variables: {
        checkoutId,
      }
    }).then(({
      data: {
        checkoutComplete: {
          order: {
            id
          },
          errors,
        }
      }
    }) => {
      if(errors.length === 0) {
        self.setState({
          status: "PAYMENT_PERSISTED",
        });
        return resetCart();
      }
      return self.setState({
          status: "PAYMENT_PERSISTENCE_FAILURE",
      });
    })
  }

  render() {
    const {
      status,
    } = this.state;
    return (
      <div>
        {
          status === "" && <RaisedButton onClick={(e) => {this.initiatePayment()}}>Pay</RaisedButton>
        }
        {
          status === "PAYMENT_STARTED" && <div>Fetching payment info from your bank</div>
        }
        {
          status === "PAYMENT_SUCCESS" && <div>Payment done, saving payment..</div>
        }
        {
          status === "PAYMENT_PERSISTED" && 
          <div>Your order is confirmed...</div>
        }
      </div>
    )
  }
}
