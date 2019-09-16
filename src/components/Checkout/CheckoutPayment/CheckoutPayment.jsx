import React, { Component } from "react";
import gql from "graphql-tag";
import { RaisedButton } from "./../../commons/";
import styled from "styled-components";
import logo from "./../../../images/logo.png";
import AddressBox from "../CheckoutAddress/AddressBox";
import { Redirect } from "react-router-dom";

const SAVE_PAYMENT = gql`
  mutation SavePayment($checkoutId: ID!, $input: PaymentInput!) {
    checkoutPaymentCreate(checkoutId: $checkoutId, input: $input) {
      errors {
        field
        message
      }
      checkout {
        id
      }
    }
  }
`;

const COMPLETE_CHECKOUT = gql`
  mutation CompleteCheckout($checkoutId: ID!) {
    checkoutComplete(checkoutId: $checkoutId) {
      errors {
        field
        message
      }
      order {
        id
        visibleOrderId
        fulfillments {
          fulfillmentOrder
          status
          trackingNumber
          shippingDate
          statusDisplay
        }
        statusDisplay
        shippingAddress {
          id
          firstName
          lastName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          country {
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
`;

const Wrapper = styled.div`
  padding: 20px;
  & > div {
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
`;

export default class CheckoutPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: "",
      shippingAddress: {},
      totalPrice: {},
      status: ""
      //PAYMENT_STARTED, PAYMENT_SUCCESS, PAYMENT_FAILURE, PAYMENT_PERSISTED, PAYMENT_PERSISTENCE_FAILURE
    };

    this.initiatePayment = this.initiatePayment.bind(this);
    this.resetStatus = this.resetStatus.bind(this);
  }

  resetStatus() {
    this.setState({
      status: ""
    });
  }

  componentWillMount() {
    this.updatePaymentOptions();
  }

  componentDidUpdate() {
    this.updatePaymentOptions();
  }

  updatePaymentOptions() {
    const self = this;
    const {
      email,
      cart: {
        shippingAddress: {
          firstName,
          lastName,
          phone,
        } = {}
      } = {}
    } = this.props;
    this.options = {
      key: "rzp_test_cP0b0TIREwm6li",
      //TODO: use this in .env file.
      name: "Marg",
      image: logo,
      handler: function(response) {
        if (response.razorpay_payment_id) {
          self.setState({
            status: "PAYMENT_SUCCESS"
          });
          self.persistPayment(response.razorpay_payment_id);
        }
        self.setState({
          status: "PAYMENT_FAILURE"
        });
      },
      prefill: {
        email,
        "contact": phone,
        "name": `${firstName} ${lastName}`,
      },
      theme: {
        color: "#F37254"
      },
      modal: {
        ondismiss: function() {
          self.setState({
            status: ""
          });
        }
      }
    };
  }

  initiatePayment() {
    const {
      cart: { totalPrice: { net: { amount, currency } = {} } = {} } = {}
    } = this.props;
    this.options.currency = currency;
    this.options.amount = amount * 100;
    const razpay = new window.Razorpay(this.options);
    razpay.open();
    this.setState({
      status: "PAYMENT_STARTED"
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
          net: { amount }
        }
      }
    } = this.props;
    client
      .mutate({
        mutation: SAVE_PAYMENT,
        variables: {
          checkoutId,
          input: {
            gateway: "RAZORPAY",
            token: paymentId,
            amount
          }
        }
      })
      .then(({ errors }) => {
        if (errors && errors.length > 0) {
          return self.setState({
            status: "PAYMENT_PERSISTENCE_FAILURE"
          });
        }
        self.setState({
          status: "PAYMENT_SUCCESS"
        });
        self.completeCheckout();
      });
  }

  completeCheckout() {
    const self = this;
    const {
      client,
      cart: { checkoutId },
      resetCart,
      clearCartCache,
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
        this.props.setCheckoutStatus('SUCCESS', visibleOrderId)
        clearCartCache();
        return resetCart();
      }
      self.setState({
        status: "PAYMENT_PERSISTENCE_FAILURE",
      });
      return false;
    })
  }

  shippingAddressIsSelected() {
    const {
      cart: {
        shippingAddress
      } = {},
    } = this.props;
    return shippingAddress && Object.entries(shippingAddress).length > 0
  }

  render() {
    const {
      status,
    } = this.state;
    const {
      cart: { checkoutId = null } = {}
    } = this.props;
    return (
      <Wrapper className="container">
        <div className="row align-items-center justify-content-center">
          {
            <RaisedButton
              onClick={e => {
                this.initiatePayment();
              }}
              disabled={!checkoutId || status === "PAYMENT_STARTED" || !this.shippingAddressIsSelected()}
            >
              {status === "PAYMENT_STARTED"
                ? "PAYMENT IN PROGRESS..."
                : "MAKE PAYMENT"}
            </RaisedButton>
          }
        </div>
      </Wrapper>
    );
  }
}
