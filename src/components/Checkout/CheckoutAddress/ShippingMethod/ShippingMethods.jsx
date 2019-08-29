import React, { useState } from 'react';
import styled from 'styled-components';
import { Query } from "react-apollo";
import gql from 'graphql-tag';

const SAVE_SHIPPING_TO_CHECKOUT = gql`
  mutation SaveAddress($checkoutId: ID!, $shippingMethodId: ID!) {
    checkoutShippingMethodUpdate(checkoutId: $checkoutId, shippingMethodId: $shippingMethodId) {
      checkout{
        shippingMethod{
          id
          name
          price {
            amount
            currency
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

const ShippingMethod = ({
  name,
  price:{
    currency,
    amount,
  },
  onClick,
  selected,
}) => (
  <AddressWrapper
    onClick={onClick}
    className={`col-12 col-md-3 row align-items-center justify-content-center ${selected?'selected':''}`}
  >
    <div>
      <div className="col-12">{name}</div>
      <div className="col-12">{currency}.&nbsp;{amount}</div>
    </div>
  </AddressWrapper>
);

export const ShippingMethods = ({
  client,
  checkoutId,
  shippingMethod,
  availableShippingMethods,

  updateShippingMethod,
}) => {
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

  return <div>{
    availableShippingMethods && availableShippingMethods.length > 0 &&
      <ListingWrapper className="row">
        <div className="header col-12">Select Shipping method</div>
        {
          availableShippingMethods.map((shippingMethodIt) => (
            <ShippingMethod
              selected={shippingMethodIt.id === shippingMethod.id}
              onClick={() => persistShippingMethod(shippingMethodIt)}
              {...shippingMethodIt}
              >
            </ShippingMethod>
          ))
        }
      </ListingWrapper>
  }</div>
}