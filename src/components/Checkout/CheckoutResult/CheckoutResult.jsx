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
              <h2>Your order has been placed successfully!</h2>
              <h2>Order ID: {orderID}</h2>
              <p>
                We have sent you a confirmation email with an attached invoice
              </p>
              <p>
                If you purchased any digital products, they will be available to
                read under the <br />
                <FlatButton>
                  <Link to="/myaccount">MY DIGITAL LIBRARY</Link>
                </FlatButton> 
                 section immediately
              </p>
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
