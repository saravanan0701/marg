import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import CheckoutPayment from "../CheckoutPayment/";
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
    disabled: (selectedShippingAddress, selectedShippingMethod) =>
      Object.entries(selectedShippingAddress).length === 0 ||
      Object.entries(selectedShippingMethod).length === 0
  },
  "/checkout/payment": {
    url: "/checkout/payment",
    buttonText: "Make Payment"
  }
};

const CheckoutSidebar = ({
  location,
  currency_preference,
  cart: {
    checkoutId,
    lines,
    subtotalPrice: { gross: { localized } = {} } = {},
    totalPrice: { gross: { localized: totalLocalized } = {} } = {},
    shippingMethod,
    shippingAddress
  } = {},
  setCheckoutStatus
}) => {
  const buttonParams = PROCEED_BUTTON_PARAMS[location.pathname];
  const [requiresShipping, setRequiresShipping] = useState(false);

  useEffect(() => {
    lines.map(lineItem => {
      if (lineItem && lineItem.variant && !lineItem.variant.isDigital) {
        setRequiresShipping(true);
      }
    });
  }, [lines]);

  return (
    <Wrapper>
      { lines && lines.length > 0 && (
        <Row>
          <Col xs="12">
            <h2 style={{ margin: 15 }}>ORDER SUMMARY</h2>
            <div className="bg-gray px-3 py-4">
              <p>
                SUBTOTAL: <span className="float-right">{localized}</span>
              </p>
              <p>
                SHIPPING:
                {Object.entries(shippingMethod).length === 0 &&
                shippingMethod.constructor === Object ? (
                  <span className="shipping-pending float-right">
                    {!requiresShipping ? "FREE" : "To be determined"}
                  </span>
                ) : (
                  <span className="float-right">
                    {currency_preference === "USD"
                      ? shippingMethod.priceUsd.localized
                      : shippingMethod.priceInr.localized}
                  </span>
                )}
              </p>
              <hr />
              <p>
                TOTAL:
                {
                  <span className="float-right">{totalLocalized? totalLocalized: "To be determined"}</span>
                }
              </p>
              {location.pathname === "/checkout/cart" && (
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
              )}
              {location.pathname === "/checkout/address" && <CheckoutPayment setCheckoutStatus={setCheckoutStatus}/>}
            </div>
          </Col>
        </Row>
      )}
    </Wrapper>
  );
};

export default withRouter(CheckoutSidebar);
