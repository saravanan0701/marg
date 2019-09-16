import React from 'react';
import styled from 'styled-components';

import AddressList from './AddressList/';
const Wrapper = styled.div`
  @media (min-width: 992px) {
    padding: 50px;
  }
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

