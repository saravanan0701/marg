import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { withRouter } from 'react-router-dom';
import { RaisedButton } from './../../commons/';

const Wrapper = styled.div`
  h2 {
    color: #000000;
    font-family: Lato;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.7px;
    line-height: 34px;
    text-transform: uppercase;
  }

  .bg-gray {
    background-color: #f8f8f8;

    p {
      color: #000000;
      font-family: Lato;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.7px;
      line-height: 34px;
      text-transform: uppercase;
    }
  }

  .checkout-proceed-button {
    background-color: #ec1d24;
    padding-top: 8px;
    padding-bottom: 8px;
  }

`;

const PROCEED_BUTTON_PARAMS = {
  '/checkout/cart': {
    url: "/checkout/address",
    buttonText: "Checkout"
  },
  '/checkout/address': {
    url: "/checkout/payment",
    buttonText: "Make Payment"
  },
  '/checkout/payment': {
    url: "/checkout/payment",
    buttonText: "Make Payment"
  },
}

const checkoutProceedButton = (buttonParams) => {
  return (
    <Link to={buttonParams.url} class="checkout-proceed-button">
      <RaisedButton className="w-100">{buttonParams.buttonText}</RaisedButton>
    </Link>
  )
}

const CheckoutSidebar = ({
  location,
  cart: {
    checkoutId,
    totalPrice: { gross: { amount, currency } = {} } = {},
    shippingMethod
  } = {}
}) => {
  console.log("Pathname: ", location);
  console.log(PROCEED_BUTTON_PARAMS[location.pathname]);
  return (
    <Wrapper>
      <Row>
        <Col xs="12">
          <h2>ORDER SUMMARY</h2>
          <div className="bg-gray px-3 py-4">
            <p>SUBTOTAL: <span className="float-right">{currency} {amount}</span></p>
            <p>SHIPPING: <span className="float-right">{
              Object.entries(shippingMethod).length === 0 && shippingMethod.constructor === Object 
              ? "To be calculated" 
              : shippingMethod.price.amount}
              </span>
            </p>
            <hr/>
            {checkoutProceedButton(PROCEED_BUTTON_PARAMS[location.pathname])}
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default withRouter(CheckoutSidebar);

