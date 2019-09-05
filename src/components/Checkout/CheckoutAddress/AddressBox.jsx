import React, { Component } from "react";
import styled from "styled-components";
import { Col } from "reactstrap";

const AddressWrapper = styled.div`
  padding: 15px;
  background-color: #f8f8f8;
  border: 1px solid #cccccc;
  cursor: pointer;

  p {
    color: #3a3a3a;
    font-family: Lato;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.59px;
    line-height: 23px;
    margin-bottom: 0px;
  }

  &.selected {
    border: 1px solid ${props => props.theme.primaryColor};;
  }
`;

const AddressBox = ({
  firstName,
  lastName,
  streetAddress1,
  streetAddress2,
  cityArea,
  city,
  countryArea,
  country: { country } = {},
  postalCode,
  phone,
  addNew,
  children,
  selected,
  onClick,
  size
}) => {
  return (
    <Col md="4" className="my-3">
      <AddressWrapper
        onClick={onClick}
        className={`${selected ? "selected" : ""}`}
      >
        {!addNew && (
          <div>
            <p>
              {firstName}&nbsp;{lastName}
            </p>
            <p>{streetAddress1},</p>
            <p>
              {cityArea ? cityArea + ",&nbsp;" : ""}
              {city}
            </p>
            <p>
              {countryArea},&nbsp;{country}
            </p>
            <p>{postalCode}</p>
            <p>{phone}</p>
          </div>
        )}
        {addNew && children}
      </AddressWrapper>
    </Col>
  );
};

export default AddressBox;
