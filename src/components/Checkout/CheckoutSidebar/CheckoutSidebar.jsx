import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { withRouter } from "react-router-dom";
import { RaisedButton } from "./../../commons/";

const Wrapper = styled.div`
  h2 {
    color: #000000;
    font-family: Lato;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.7px;
    line-height: 34px;
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
    }
  }

  .checkout-proceed-button {
    background-color: #ec1d24;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .shipping-pending {
    color: #3a3a3a;
    font-family: Lato;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.7px;
    line-height: 34px;
  }
`;

const PROCEED_BUTTON_PARAMS = {
  "/checkout/cart": {
    url: "/checkout/address",
    buttonText: "Checkout"
  },
  "/checkout/address": {
    url: "/checkout/payment",
    buttonText: "Make Payment",
    disabled: (selectedShippingAddress, selectedShippingMethod) => Object.entries(selectedShippingAddress).length === 0 || Object.entries(selectedShippingMethod).length === 0
  },
  "/checkout/payment": {
    url: "/checkout/payment",
    buttonText: "Make Payment"
  }
};

const CheckoutSidebar = ({
  location,
  cart: {
    checkoutId,
    totalPrice: { gross: { amount, currency } = {} } = {},
    shippingMethod,
    shippingAddress
  } = {}
}) => {

  const buttonParams = PROCEED_BUTTON_PARAMS[location.pathname];

  return (
    <Wrapper>
      <Row>
        <Col xs="12">
          <h2 style={{ margin: 15 }}>ORDER SUMMARY</h2>
          <div className="bg-gray px-3 py-4">
            <p>
              SUBTOTAL:{" "}
              <span className="float-right">
                {currency} {amount}
              </span>
            </p>
            <p>
              SHIPPING:
              {Object.entries(shippingMethod).length === 0 &&
              shippingMethod.constructor === Object ? (
                <span className="shipping-pending float-right">
                  To be determined
                </span>
              ) : (
                <span className="float-right">
                  {shippingMethod.price.amount}
                </span>
              )}
            </p>
            <hr />
            <Link to={buttonParams.url} class="checkout-proceed-button">
              <RaisedButton
                disabled={
                  buttonParams.disabled
                    ? buttonParams.disabled(shippingAddress, shippingMethod)
                    : false
                }
                className="w-100"
              >
                {buttonParams.buttonText}
              </RaisedButton>
            </Link>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default withRouter(CheckoutSidebar);
