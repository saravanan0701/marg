import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FlatButton from "../../commons/FlatButton";

const Wrapper = styled.div`
  h2 {
    text-transform: uppercase;
    font-family: Lato;
    font-size: 24px;
  }
`;

const CheckoutResult = ({ orderID }) => {
  return (
    <Wrapper>
      <div class="row my-5">
        <div className="col-12 col-lg-6 mx-auto text-center">
          {orderID !== null && (
            <div>
              <h4>Your order has been placed successfully!</h4>
              <h2>Order ID: {orderID}</h2>
            </div>
          )}

          {orderID === null && (
            <div>
              <div>Oops! Something went wrong with your order!</div>
              <p>We apologize for the inconvenience.</p>
              <p>
                Please <Link to="/contact">get in touch</Link> and we'll assist
                you
              </p>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default CheckoutResult;
