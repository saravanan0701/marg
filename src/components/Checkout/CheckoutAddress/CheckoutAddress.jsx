import React, { Component } from 'react';
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

class CheckoutAddress extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrapper>
        <AddressList />
        <ShippingMethod />
        
        <RaisedButton colortype="primary">
          Next
        </RaisedButton>
      </Wrapper>
    )
  }
}

export default CheckoutAddress;

