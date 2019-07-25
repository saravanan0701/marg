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

export const AddressList = ({
  userId,
  firstName,
  lastName,
  email,
  client,
  addresses,
  cartShippingAddress,
  addNewAddress,
  addAvailableShippingMethods,
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



  return (
    <ListingWrapper className="row">
      <div className="header col-12">Saved Addresses</div>
      {
        addresses &&
          addresses
            .map((address, id) => (
              <ShippingAddress
                size="col-12 col-md-3"
                key={address && address.id}
                onClick={() => this.selectAddress(address)}
                selected={
                  (() => {
                    if(!cartShippingAddress) {
                      return id === 0;
                      //Select first address if none is selected and 
                      // checkout.cartShippingAddress is null.
                    }
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



