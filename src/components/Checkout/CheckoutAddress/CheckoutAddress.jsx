import React from 'react';
import styled from 'styled-components';

import AddressList from './AddressList/';
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
  </Wrapper>
)

export default CheckoutAddress;

