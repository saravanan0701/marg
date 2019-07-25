import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import { Container, Row, Col } from 'reactstrap';

import { RaisedButton, FlatButton, DropDown, RadioButtonSet } from './../../commons/';
import AddressList from './AddressList/';

const Wrapper = styled.div`
  padding: 50px;
`;

const SAVE_ADDRESS_AND_SHIPPING_TO_CHECKOUT = gql`
  mutation SaveAddress($checkoutId: ID!, $shippingAddress: AddressInput!,$shippingMethodId: ID!) {
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
    checkoutShippingMethodUpdate(checkoutId: $checkoutId, shippingMethodId: $shippingMethodId) {
      checkout{
        shippingMethod{
          id
          name
        }
      }
      errors{
        field
        message
      }
    }
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
      <Col className="col-12">{name}</Col>
      <Col className="col-12">{currency}.&nbsp;{amount}</Col>
    </div>
  </AddressWrapper>
);

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

class CheckoutAddress extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedShippingMethod: null,
    };

    this.selectShippingMethod = this.selectShippingMethod.bind(this);
    this.saveAddressAndShippingMethod = this.saveAddressAndShippingMethod.bind(this);
  }

  selectShippingMethod(shippingMethod) {
    this.setState({
      selectedShippingMethod: shippingMethod,
    });
  }

  saveAddressAndShippingMethod() {
    const {
      client,
      addresses,
      cart: {
        checkoutId,
        availableShippingMethods,
        shippingAddress,
      },
      updateShippingMethod,
      updateShippingAddress,
      history: {
        push,
      },
    } = this.props;
    let {
      selectedAddress,
      selectedShippingMethod,
    } = this.state;
    selectedAddress = selectedAddress? selectedAddress: (shippingAddress || (addresses && addresses.length > 0 && addresses[0]));
    selectedShippingMethod = selectedShippingMethod? selectedShippingMethod: (availableShippingMethods[0]);
    delete selectedAddress.__typename;
    selectedAddress.country = selectedAddress.country.code;
    delete selectedAddress.id;
    return client.mutate({
      mutation: SAVE_ADDRESS_AND_SHIPPING_TO_CHECKOUT,
      variables: {
        checkoutId,
        shippingAddress: selectedAddress,
        shippingMethodId: availableShippingMethods[0].id,
      },
    }).then(
      (
        {
          data: {
            checkoutShippingMethodUpdate: {
              checkout: {
                shippingMethod
              },
              errors: checkoutShippingMethodErrors,
            },
            checkoutShippingAddressUpdate: {
              checkout: {
                shippingAddress,
              },
              errors: checkoutShippingAddressErrors,
            },
            checkoutBillingAddressUpdate: {
              checkout: {
                billingAddress,
              },
              errors: checkoutBillingAddressErrors,
            },
          }
        }
      ) => {
        if(
            (checkoutShippingMethodErrors && checkoutShippingMethodErrors.length > 0)
            ||
            (checkoutShippingAddressErrors && checkoutShippingAddressErrors.length > 0)
            ||
            (checkoutBillingAddressErrors && checkoutBillingAddressErrors.length > 0)
          ){
          //TODO: show errors.
          return false;
        }
        updateShippingMethod(shippingMethod);
        updateShippingAddress(shippingAddress);
        //TODO: Optional update billing address.
        return true;
      }
    ).then(() => push("/checkout/payment"))
  }

  render() {
    const {
      country,
      showAddressForm,
      selectedAddress,
    } = this.state;
    const {
      firstName,
      lastName,
      email,
      addresses,
      cart: {
        shippingAddress,
        availableShippingMethods,
      }
    } = this.props;
    const self = this;
    return (
      <Wrapper>
        <AddressList />
        {
          availableShippingMethods && availableShippingMethods.length > 0 &&
          <ListingWrapper className="row">
            <div class="header col-12">Shipping method</div>
            {
              availableShippingMethods.map((shippingMethod) => (
                <ShippingMethod
                  selected="true"
                  onClick={() => this.selectShippingMethod(shippingMethod)}
                  {...shippingMethod}
                >
                </ShippingMethod>
              ))
            }
          </ListingWrapper>
        }
        
        <RaisedButton colortype="primary" onClick={this.saveAddressAndShippingMethod}>
          Next
        </RaisedButton>
      </Wrapper>
    )
  }
}

export default CheckoutAddress;

