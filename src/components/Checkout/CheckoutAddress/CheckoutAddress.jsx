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
) => {

  return <AddressWrapper
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
};

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
    this.saveAddressAndShippingMethod = this.saveAddressAndShippingMethod.bind(this);
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
        return false;
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

  checkIfSameAddress(address1, address2) {
    const address1Keys = Object.keys(address1);
    const address2Keys = Object.keys(address2);
    if(address1Keys.length !== address2Keys.length) {
      return false;
    }
    return address1Keys.reduce((acc, it) => {
      if(acc === false) {
        return false;
      }
      if(it === "country" || it === "id") {
        return true;
      }
      if(!address1[it] && !address2[it]) {
        return true;
      }
      return address1[it] && address2[it] && address1[it].toLowerCase() === address2[it].toLowerCase()
    }, true)
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
      addresses,
      cart: {
        shippingAddress,
        availableShippingMethods,
      }
    } = this.props;
    const self = this;
    return (
      <Wrapper>
        {
          shippingAddress &&
          <ListingWrapper className="row">
            <div className="header col-12">Saved Addresses</div>
            {
              shippingAddress &&
              <ShippingAddress
                key={selectedAddress && selectedAddress.id}
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
                    if(shippingAddress && !self.checkIfSameAddress(address, shippingAddress)) {
                      // TODO-BUG On selecting an address and saving duplicate item is rendered...
                      return true;
                    }
                    return false;
                  })
                  .map((address, id) => (
                      <ShippingAddress
                        key={address && address.id}
                        onClick={() => this.selectAddress(address)}
                        selected={
                          (() => {
                            if(!shippingAddress && !selectedAddress) {
                              return id === 0;
                              //Select first address if none is selected and 
                              // checkout.shippingAddress is null.
                            }
                            return selectedAddress && this.checkIfSameAddress(address, selectedAddress);
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
        <RaisedButton colortype="primary" onClick={this.saveAddressAndShippingMethod}>
          Next
        </RaisedButton>
      </Wrapper>
    )
  }
}

export default CheckoutAddress;