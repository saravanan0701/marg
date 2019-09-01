import React, { Component, useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { checkIfSameAddress } from "./../../../../utils";
import AddressBox from "../AddressBox";
import AddressEditForm from "./../AddressEditForm.jsx";
import { RaisedButton, FlatButton } from "./../../../commons/";
import { Row, Col } from "reactstrap";

const ListingWrapper = styled.div`
  .section-label {
    color: #000000;
    font-family: Lato;
    font-size: 16px;
    font-weight: 900;
    letter-spacing: 3px;
    text-transform: uppercase;
  }
`;

const SAVE_NEW_ADDRESS = gql`
  mutation SaveAddress($userId: ID!, $input: AddressInput!) {
    addressCreate(userId: $userId, input: $input) {
      errors {
        field
        message
      }
      address {
        id
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        cityArea
        postalCode
        country {
          country
          code
        }
        countryArea
        phone
      }
    }
  }
`;

const SAVE_ADDRESS_TO_CHECKOUT = gql`
  mutation SaveAddress($checkoutId: ID!, $shippingAddress: AddressInput!) {
    checkoutShippingAddressUpdate(
      checkoutId: $checkoutId
      shippingAddress: $shippingAddress
    ) {
      checkout {
        shippingAddress {
          id
          firstName
          lastName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          country {
            country
            code
          }
          countryArea
          phone
        }
        availableShippingMethods {
          id
          name
          priceInr{
            currency
            amount
            localized
          }
          priceUsd{
            currency
            amount
            localized
          }
        }
      }
      errors {
        field
        message
      }
    }
    checkoutBillingAddressUpdate(
      checkoutId: $checkoutId
      billingAddress: $shippingAddress
    ) {
      checkout {
        billingAddress {
          id
          firstName
          lastName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          country {
            country
            code
          }
          countryArea
          phone
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

const SAVE_SHIPPING_TO_CHECKOUT = gql`
  mutation SaveAddress($checkoutId: ID!, $shippingMethodId: ID!) {
    checkoutShippingMethodUpdate(checkoutId: $checkoutId, shippingMethodId: $shippingMethodId) {
      checkout{
        shippingMethod{
          id
          name
          priceInr {
            amount
            currency
            localized
          }
          priceUsd {
            amount
            currency
            localized
          }
        }
      }
      errors{
        field
        message
      }
    }
  }
`;

export const AddressList = ({
  checkoutId,
  userId,
  firstName,
  lastName,
  email,
  client,
  addresses,
  shippingAddress: cartShippingAddress,

  addNewAddress,
  setAvailableShippingMethods,
  updateShippingAddress,
  updateShippingMethod
}) => {
  const [showAddressForm, setShowAddressForm] = useState(false);

  const saveAddress = shippingAddress => {
    return client
      .mutate({
        mutation: SAVE_NEW_ADDRESS,
        variables: {
          userId,
          input: shippingAddress
        }
      })
      .then(({ data: { addressCreate: { address, errors } } }) => {
        if (errors && errors.length > 0) {
          return false;
        }
        addNewAddress(address);
        return address;
      });
  };

  const saveAddressToCart = shippingAddress => {
    const updatableShipping = { ...shippingAddress };
    delete updatableShipping.__typename;
    if (updatableShipping.phone.length === 10) {
      updatableShipping.phone = `+91{updatableShipping.phone}`;
    }
    updatableShipping.country = updatableShipping.country.code;
    delete updatableShipping.id;
    client
      .mutate({
        mutation: SAVE_ADDRESS_TO_CHECKOUT,
        variables: {
          checkoutId,
          shippingAddress: updatableShipping
        }
      })
      .then(
        ({
          data: {
            checkoutShippingAddressUpdate: {
              checkout: {
                shippingAddress: updatedShippingAddress,
                availableShippingMethods
              } = {},
              errors: checkoutShippingAddressErrors
            } = {},
            checkoutBillingAddressUpdate: {
              checkout: { billingAddress } = {},
              errors: checkoutBillingAddressErrors
            } = {}
          }
        }) => {
          if (
            (checkoutShippingAddressErrors &&
              checkoutShippingAddressErrors.length > 0) ||
            (checkoutBillingAddressErrors &&
              checkoutBillingAddressErrors.length > 0)
          ) {
            //TODO: show errors.
            return false;
          }
          updateShippingAddress(updatedShippingAddress);
          // setAvailableShippingMethods(availableShippingMethods);
          persistShippingMethod(availableShippingMethods[0]);
          //TODO: Optional update billing address.
          return true;
        }
      )
  };

  const persistShippingMethod = (shippingMethod) => {
    return client.mutate({
      mutation: SAVE_SHIPPING_TO_CHECKOUT,
      variables: {
        checkoutId,
        shippingMethodId: shippingMethod.id,
      },
    }).then(
      (
        {
          data: {
            checkoutShippingMethodUpdate: {
              checkout: {
                shippingMethod: updatedShippingMethod,
              },
              errors: checkoutShippingMethodErrors,
            },
          }
        }
      ) => {
        if(checkoutShippingMethodErrors.length > 0) {
          return;
        }
        updateShippingMethod(updatedShippingMethod);
      }
    );
  }

  return (
    <ListingWrapper>
      <Row>
        <Col xs="12">
          <p className="section-label">
            SAVED ADDRESSES
            <FlatButton
              onClick={e => setShowAddressForm(true)}
              className={`ml-4 ${showAddressForm ? "d-none" : "d-inline"}`}
            >
              ADD A NEW ADDRESS
            </FlatButton>
          </p>
        </Col>
      </Row>
      <Row>
        {addresses &&
          addresses.map((address, id) => (
            <AddressBox
              size="col-12 col-md-3"
              key={address && address.id}
              onClick={() => saveAddressToCart(address)}
              selected={(() => {
                return (
                  cartShippingAddress &&
                  checkIfSameAddress(address, cartShippingAddress)
                );
              })()}
              {...address}
            />
          ))}
      </Row>

      <Row>
        <Col xs="12">
          {showAddressForm && (
            <AddressEditForm
              firstName={firstName}
              lastName={lastName}
              email={email}
              saveAddress={values => saveAddress(values)}
              toggleAddressForm={() => setShowAddressForm(!showAddressForm)}
            />
          )}
        </Col>
      </Row>
    </ListingWrapper>
  );
};
