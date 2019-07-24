import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import { Container, Row, Col } from 'reactstrap';

import { RaisedButton, FlatButton, DropDown, RadioButtonSet } from './../../commons/';
import AddressEditForm from './AddressEditForm.jsx';

const Wrapper = styled.div`
  padding: 50px;
`;

const SAVE_ADDRESS = gql`
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
    }
  }
`;

const SAVE_SHIPPING_METHOD = gql`
  mutation SaveShippingMethod($checkoutId: ID!, $shippingMethodId: ID!) {
    checkoutShippingMethodUpdate(checkoutId: $checkoutId, shippingMethodId: $shippingMethodId) {
      checkout{
        shippingMethod{
          id
          name
        }
      }
    }
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
  }
) => (
  <AddressWrapper
    onClick={onClick}
    className={`col-12 col-md-3 row align-items-center justify-content-center ${selected?'selected':''}`}>
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
);

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
      price: 1000,
      showAddressForm: false,
      selectedAddress: null,
      selectedShippingMethod: null,
    };

    this.toggleAddressForm = this.toggleAddressForm.bind(this);
    this.selectAddress = this.selectAddress.bind(this);
    this.selectShippingMethod = this.selectShippingMethod.bind(this);
  }

  toggleAddressForm() {
    this.setState({
      showAddressForm: !this.state.showAddressForm,
    })
  }

  saveAddress(shippingAddress) {
    const {
      client,
      userId,
      cart: {
        checkoutId,
      },
      addNewAddress,
    } = this.props;
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
        return;
      }
      addNewAddress(address);
      return address;
    })
  }

  selectAddress(address) {
    this.setState({
      selectedAddress: address,
    })
  }

  selectShippingMethod(shippingMethod) {
    this.setState({
      selectedShippingMethod: shippingMethod,
    });
  }

  saveShippingMethod() {
    const {
      client,
      cart: {
        checkoutId,
        availableShippingMethods,
      },
      updateShippingMethod,
    } = this.props;
    return client.mutate({
      mutation: SAVE_SHIPPING_METHOD,
      variables: {
        checkoutId,
        shippingMethodId: availableShippingMethods[0].id,
      },
    }).then((
        {
          data: {
            checkoutShippingMethodUpdate: {
              checkout: {
                shippingMethod
              }
            }
          }
        }
      ) => {
      updateShippingMethod(shippingMethod);
      return shippingMethod;
    })
  }

  render() {
    const {
      country,
      price,
      showAddressForm,
      selectedAddress,
    } = this.state;
    const {
      firstName,
      lastName,
      email,
      history: {
        push,
      },
      addresses,
      cart: {
        shippingAddress,
        availableShippingMethods,
      }
    } = this.props;

    return (
      <Wrapper>
        {
          shippingAddress &&
          <ListingWrapper className="row">
            <div class="header col-12">Saved Addresses</div>
            {
              shippingAddress &&
              <ShippingAddress
                selected={
                  (() => {
                    if(selectedAddress && selectedAddress.id) {
                      return selectedAddress.id === shippingAddress.id
                    }
                    return true;
                  })()
                }
                onClick={() => this.selectAddress(shippingAddress)}
                {...shippingAddress}
              >
              </ShippingAddress>
            }
            {
              addresses &&
                addresses
                  .filter((address) => {
                    if(shippingAddress && address.id != shippingAddress.id) {
                      return true;
                    }
                    return false;
                  })
                  .map((address, id) => (
                      <ShippingAddress
                        onClick={() => this.selectAddress(address)}
                        selected={
                          (() => {
                            if(!shippingAddress && !selectedAddress) {
                              return id === 0;
                              //Select first address if none is selected and 
                              // checkout.shippingAddress is null.
                            }
                            return selectedAddress && address.id === selectedAddress.id
                          })()
                        }
                        {...address}
                        >
                      </ShippingAddress>
                    )
                  )
                  .concat(
                    <ShippingAddress addNew={true}>
                      <RaisedButton onClick={this.toggleAddressForm} colortype="primary">
                          Add new address
                      </RaisedButton>
                    </ShippingAddress>
                  )
            }
          </ListingWrapper>
        }
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
        { showAddressForm &&
          <AddressEditForm
            firstName={firstName}
            lastName={lastName}
            email={email}
            saveAddress={(values) => this.saveAddress(values)}
            toggleAddressForm={this.toggleAddressForm}
          >
          </AddressEditForm>
        }
      </Wrapper>
    )
  }
}

export default CheckoutAddress;