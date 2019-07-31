import React, { Component, useState } from 'react';
import styled from 'styled-components';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import { checkIfSameAddress } from './../../../../utils';
import ShippingAddress from './../ShippingAddress.jsx';
import AddressEditForm from './../AddressEditForm.jsx';
import { RaisedButton } from './../../../commons/';

const ListingWrapper = styled.div`
  margin-bottom: 30px;
  & > * {
    margin-right: 10px;
  }
  & > .header {
    padding: 0px;
    font-family: "Cormorant Garamond Medium";
    font-size: ${props => props.theme['$font-size-lg']};
  }
`;

const SAVE_NEW_ADDRESS = gql`
  mutation SaveAddress($userId: ID!, $input: AddressInput!) {
    addressCreate(userId: $userId, input: $input) {
      errors{
        field
        message
      }
      address{
        id
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        cityArea
        postalCode
        country{
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
    checkoutShippingAddressUpdate(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {
      checkout{
        shippingAddress{
          id
          firstName
          lastName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          country{
            country
            code
          }
          countryArea
          phone
        }
        availableShippingMethods{
          id
          name
          price{
            currency
            amount
          }
        }
      }
      errors{
        field
        message
      }
    }
    checkoutBillingAddressUpdate(checkoutId: $checkoutId, billingAddress: $shippingAddress) {
      checkout{
        billingAddress{
          id
          firstName
          lastName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          country{
            country
            code
          }
          countryArea
          phone
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
}) => {

  const [ showAddressForm, setShowAddressForm ] = useState(false);

  const saveAddress = (shippingAddress) => {
    return client.mutate({
      mutation: SAVE_NEW_ADDRESS,
      variables: {
        userId,
        input: shippingAddress,
      },
    }).then((
      {
        data: {
          addressCreate: {
            address,
            errors,
          }
        }
      }
    ) => {
      if(errors && errors.length > 0) {
        return false;
      }
      addNewAddress(address);
      return address;
    })
  }

  const saveAddressToCart = (shippingAddress) => {
    const updatableShipping = {...shippingAddress};
    delete updatableShipping.__typename;
    if(updatableShipping.phone.length === 10) {
      updatableShipping.phone = `+91{updatableShipping.phone}`
    }
    updatableShipping.country = updatableShipping.country.code;
    delete updatableShipping.id;
    client.mutate({
      mutation: SAVE_ADDRESS_TO_CHECKOUT,
      variables: {
        checkoutId,
        shippingAddress: updatableShipping,
      },
    }).then(
      (
        {
          data: {
            checkoutShippingAddressUpdate: {
              checkout: {
                shippingAddress: updatedShippingAddress,
                availableShippingMethods,
              }={},
              errors: checkoutShippingAddressErrors,
            }={},
            checkoutBillingAddressUpdate: {
              checkout: {
                billingAddress,
              }={},
              errors: checkoutBillingAddressErrors,
            }={},
          }
        }
      ) => {
        if(
            (checkoutShippingAddressErrors && checkoutShippingAddressErrors.length > 0)
            ||
            (checkoutBillingAddressErrors && checkoutBillingAddressErrors.length > 0)
          ){
          //TODO: show errors.
          return false;
        }
        updateShippingAddress(updatedShippingAddress);
        setAvailableShippingMethods(availableShippingMethods);
        //TODO: Optional update billing address.
        return true;
      }
    )
  }

  return (
    <ListingWrapper className="row">
      <div className="header col-12">Please select an address</div>
      {
        addresses &&
          addresses
            .map((address, id) => (
              <ShippingAddress
                size="col-12 col-md-3"
                key={address && address.id}
                onClick={() => saveAddressToCart(address)}
                selected={
                  (() => {
                    return cartShippingAddress && checkIfSameAddress(address, cartShippingAddress);
                  })()
                }
                {...address}
              >
              </ShippingAddress>
            ))
            .concat(
              <ShippingAddress size="col-12 col-md-3" addNew={true}>
                <RaisedButton onClick={(e) => setShowAddressForm(!showAddressForm)} colortype="primary">
                  Add new address
                </RaisedButton>
              </ShippingAddress>
            )
      }
      { 
        showAddressForm &&
          <AddressEditForm
            firstName={firstName}
            lastName={lastName}
            email={email}
            saveAddress={(values) => saveAddress(values)}
            toggleAddressForm={() => setShowAddressForm(!showAddressForm)}
          >
          </AddressEditForm>
      }
    </ListingWrapper>
  );
}



