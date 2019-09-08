import React, { Component } from 'react'
import gql from 'graphql-tag';
import { RaisedButton } from './../../commons/';
import styled from 'styled-components';
import logo from './../../../images/logo.png';
import AddressBox from '../CheckoutAddress/AddressBox';

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
        visibleOrderId
        fulfillments{
          fulfillmentOrder
          status
          trackingNumber
          shippingDate
          statusDisplay
        }
        statusDisplay
        shippingAddress{
          id
          firstName
          lastName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          country{
            country
            code
          }
          countryArea
          phone
        }
        totalInr{
          net{
            amount
            currency
            localized
          }
        }
        totalUsd{
          net{
            amount
            currency
            localized
          }
        }
      }
    }
  }
`

const Wrapper = styled.div`

  padding: 20px;
  & > div {
    min-height: 50vh;
    height: 100%;
    border: solid 2px grey;

    & > .under-progress {
      font-size: 40px;
      font-weight: bold;
    }

    & > .success {
      & > .header {
        font-size: 40px;
      }
    }

    & > .failure {
      font-size: 40px;
    }
  }
`

export default class CheckoutPayment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderId: "",
      shippingAddress: {},
      totalPrice: {},
      status: "",
      //PAYMENT_STARTED, PAYMENT_SUCCESS, PAYMENT_FAILURE, PAYMENT_PERSISTED, PAYMENT_PERSISTENCE_FAILURE
    }

    this.initiatePayment = this.initiatePayment.bind(this);
    this.resetStatus = this.resetStatus.bind(this);
  }

  resetStatus() {
    this.setState({
      status: "",
    })
  }

  componentDidMount() {
    const self = this;
    this.options = {
      "key": "rzp_test_cP0b0TIREwm6li",
      //TODO: use this in .env file.
      "name": "Marg",
      "image": logo,
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
      },
      "modal": {
        "ondismiss": function(){
          self.setState({
            status: "",
          });
        }
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
          } = {},
        } = {},
      } = {},
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
      ({
        errors,
      }) => {
        if(errors && errors.length > 0) {
          return self.setState({
            status: "PAYMENT_PERSISTENCE_FAILURE"
          });
        }
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
            id,
            visibleOrderId,
            shippingAddress,
            totalInr: {
              net: netInr,
            },
            totalUsd: {
              net: netUsd,
            }
          },
          errors,
        }
      }
    }) => {
      if(errors.length === 0) {
        self.setState({
          shippingAddress,
          visibleOrderId,
          totalPrice: netInr.amount > 0? netInr: netUsd,
          orderId: id,
          status: "PAYMENT_PERSISTED",
        });
        return resetCart();
      }
      self.setState({
        status: "PAYMENT_PERSISTENCE_FAILURE",
      });
      return false;
    })
  }

  render() {
    const {
      status,
      orderId,
      visibleOrderId,
      shippingAddress,
      totalPrice: {
        amount,
        currency,
      },
    } = this.state;
    return (
      <Wrapper className="container">
        <div className="row align-items-center justify-content-center">
          {
            status === "" && <RaisedButton onClick={(e) => {this.initiatePayment()}}>Pay</RaisedButton>
          }
          {
            status === "PAYMENT_STARTED" &&
              <div className="under-progress">Please donot refresh, processing payment.</div>
          }
          {/*{
            status === "PAYMENT_SUCCESS" &&
              <div className="success">
                <div className="header">Please donot refresh, saving order.</div> 
              </div>
          }*/}
          {
            status === "PAYMENT_PERSISTED" && 
              <div className="success row col-12">
                <div className="header col-12">Order successful, your order #{visibleOrderId}.</div>
                <div className="body col-12 row">
                  <div className="address col-12 col-md-6">
                    <div>Your order will be delivered</div>
                    <AddressBox size="col-12" {...shippingAddress} />
                  </div>
                  <div className="payment col-12 col-md-6">
                    <div>You have payed&nbsp;{currency}.&nbsp;{amount}</div>
                  </div>
                </div>
              </div>
          }
          {
            (status === "PAYMENT_PERSISTENCE_FAILURE") &&
              <div className="row col-12 failure">
                Order has not been placed, you'll be refunded shortly
              </div>
          }
        </div>
      </Wrapper>
    )
  }
}
