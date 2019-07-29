import React from 'react';
import styled from 'styled-components';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import { Container, Row, Col } from 'reactstrap';

import { RaisedButton, FlatButton, DropDown, RadioButtonSet } from './../../commons/';
import AddressList from './AddressList/';
import ShippingMethod from './ShippingMethod/';
const Wrapper = styled.div`
  padding: 50px;
`;

const CheckoutAddress = ({
  shippingAddress,
  shippingMethod,
  history: {
    push,
  }
}) => (

  <Wrapper>
    <AddressList />
    <ShippingMethod />
        
    {
      shippingAddress && shippingMethod && shippingAddress.id && shippingMethod.id &&
          <RaisedButton onClick={() => push("/checkout/payment")} colortype="primary">
            Next
          </RaisedButton>
    }
  </Wrapper>
)

export default CheckoutAddress;

