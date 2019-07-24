import React, { Component } from 'react';
import styled from 'styled-components';
import { Col } from 'reactstrap';

const AddressWrapper = styled.div`
  padding: 15px;
  border: solid 1px black;
  border-radius: 10px;
  margin-left: 0px !important;
  margin-right: 10px !important;
  cursor: pointer;
  &.selected {
    border-top: solid 5px ${props => props.theme.primaryColor};
  }
`;

const ShippingAddress = (
  {
    firstName,
    lastName,
    streetAddress1,
    streetAddress2,
    cityArea,
    city,
    countryArea,
    country: {
      country,
    }={},
    postalCode,
    phone,
    addNew,
    children,
    selected,
    onClick,
    size,
  }
) => {

  return <AddressWrapper
    onClick={onClick}
    className={`${size} row align-items-center justify-content-center ${selected?'selected':''}`}>
    {
      !addNew &&
        <div>
          <Col className="col-12">{firstName}&nbsp;{lastName}</Col>
          <Col className="col-12">{streetAddress1},</Col>
          <Col className="col-12">{cityArea? cityArea + ',&nbsp;': ''}{city}</Col>
          <Col className="col-12">{countryArea},&nbsp;{country}</Col>
          <Col className="col-12">{postalCode}</Col>
          <Col className="col-12">{phone}</Col>
        </div>
    }
    {
      addNew && 
      children
    }
  </AddressWrapper>
};

export default ShippingAddress;