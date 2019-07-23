import React, { Component } from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import { Container, Row, Col } from 'reactstrap';

import { getAllCountries } from './../../../utils/';
import { RaisedButton, FlatButton, DropDown, RadioButtonSet } from './../../commons/';

const Wrapper = styled.div`
  padding: 50px;

  & > .address-form {
    & > .header {
      font-family: "Cormorant Garamond Medium";
      font-size: ${props => props.theme['$font-size-lg']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 1px;
      line-height: 57px;
    }

    & > .description {
      font-size: ${props => props.theme['$font-size-xxs']};;
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 0.59px;
      line-height: 23px;
      width: 55%;
    }

    & > div.address-block {

      width: 50%;

      & > form {

        & .label {
          color: #000000;
          font-size: ${props => props.theme['$font-size-xxs']};
          font-weight: ${props => props.theme['$weight-bold']};
          letter-spacing: 3px;
          text-transform: uppercase;
          padding-bottom: 10px;
          padding-top: 50px;
        }

        & .input-container {
          position: relative;

          & > input, & > textarea {
            border: 1px solid #979797;
            padding: 10px;
            width: 100%
          }

          & > div.error {
            position: absolute;
            bottom: -22px;
          }
        }

        & > .horizontal-inputs {
          padding: 0px;
          & > div {
            padding: 0px;
            & .dropdown {
              width: 100%;

              & button.label {
                width: 100%;
                padding: 10px !important;
                border: 1px solid #979797 !important;
                padding: 10px;

                & > div {
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  width: 90%;
                  height: 24px;
                }

                & > span {
                  width: 10%;
                  padding: 0px;
                }
              }
            }
          }
        }

        & > .actions {
          padding: 10px;
        }
      }
    }
  }
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

const {
  countries,
  defaultCountry,
} = getAllCountries();

const DEFAULT_COUNTRY = defaultCountry;
const COUNTRIES = countries;
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

const AddressListingWrapper = styled.div`
  margin-bottom: 30px;
  & > * {
    margin-right: 10px;
  }
`;

class CheckoutAddress extends Component {

  constructor(props) {
    super(props);

    this.state = {
      country: DEFAULT_COUNTRY,
      price: 1000,
      showAddressForm: false,
      selectedAddress: null,
    };

    this.toggleAddressForm = this.toggleAddressForm.bind(this);
    this.selectAddress = this.selectAddress.bind(this);
  }

  toggleAddressForm() {
    this.setState({
      showAddressForm: !this.state.showAddressForm,
    })
  }

  selectCountry(country) {
    this.setState({
      country,
    });
  }

  selectState(state) {
    this.setState({
      state,
    });
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
    const self = this;

    return (
      <Wrapper>
        {
          shippingAddress &&
          <AddressListingWrapper className="row">
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
                    </ShippingAddress>)
            }
          </AddressListingWrapper>
        }
        { showAddressForm &&
          <div className="address-form">
            <div className="header">
              Add new shipping Address
            </div>
            <div className="description">
              You order will be delivered at this address
            </div>
            <Formik
              enableReinitialize
              initialValues={{
                firstName,
                lastName,
                email,
              }}
              validate={
                values => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = 'Required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = 'Invalid email address';
                  }
                  return errors;
                }
              }
              onSubmit={
                (values, { setSubmitting, resetForm }) => {
                  values.streetAddress2 = values.streetAddress1;
                  values.country = self.state.country.slug;
                  values.countryArea = self.state.state.name;
                  delete values.email;
                  this
                    .saveAddress(values)
                    .then(() => setSubmitting(false))
                    .then(() => this.toggleAddressForm())
                    .then(() => resetForm());
                }
              }
            >
              {
                ({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => 
                  (
                    <div className="address-block row">
                      <form className="row col-12" onSubmit={handleSubmit}>
                        <div className="label col-12">First Name</div>
                        <div className="input-container col-12">
                          <input
                            type="firstName"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                          />
                          <div className="error">{errors.firstName && touched.firstName && errors.firstName}</div>
                        </div>
                        <div className="label col-12">Last Name</div>
                        <div className="input-container col-12">
                          <input
                            type="lastName"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                          />
                          <div className="error">{errors.lastName && touched.lastName && errors.lastName}</div>
                        </div>
                        <div className="label col-12">Phone</div>
                        <div className="input-container col-12">
                          <input
                            type="phone"
                            name="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            />
                          <div className="error">{errors.phone && touched.phone && errors.phone}</div>
                        </div>
                        <div className="label col-12">Your Email</div>
                        <div className="input-container col-12">
                          <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <div className="error">{errors.email && touched.email && errors.email}</div>
                        </div>
                        <div className="label col-12">Address</div>
                        <div className="input-container col-12">
                          <textarea
                            rows="3"
                            type="streetAddress1"
                            name="streetAddress1"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.streetAddress1}
                          />
                          <div className="error">
                            {errors.streetAddress1 && touched.streetAddress1 && errors.streetAddress1}
                          </div>
                        </div>
                        <div className="horizontal-inputs col-6">
                          <div className="col-12">
                            <div className="label col-12">City</div>
                            <div className="input-container col-12">
                              <input
                                rows="3"
                                type="city"
                                name="city"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.city}
                              />
                              <div className="error">{errors.city && touched.city && errors.city}</div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="label col-12">State</div>
                            <div className="input-container col-12">
                              <DropDown
                                onClick={(e) => e.preventDefault()}
                                enableSearch="true"
                                loadData={country.states}
                                showSelectedOption="true"
                                className="dropdown"
                                onOptionSelect={(val) => this.selectState(val)} />
                            </div>
                          </div>
                        </div>
                        <div className="horizontal-inputs col-6">
                          <div className="col-12">
                            <div className="label col-12">ZIP/POSTAL CODE</div>
                            <div className="input-container col-12">
                              <input
                                rows="3"
                                type="postalCode"
                                name="postalCode"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.postalCode}
                              />
                              <div className="error">{errors.postalCode && touched.postalCode && errors.postalCode}</div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="label col-12">Country</div>
                            <div className="input-container col-12">
                              <DropDown
                                onClick={(e) => e.preventDefault()}
                                defaultOption={country}
                                enableSearch="true"
                                loadData={COUNTRIES}
                                showSelectedOption="true"
                                className="dropdown"
                                onOptionSelect={(val) => this.selectCountry(val)} />
                            </div>
                          </div>
                        </div>
                        <div className="actions row align-items-center col-12 justify-content-around">
                          <RaisedButton type="submit" colortype="primary" disabled={isSubmitting}>
                            { isSubmitting ? 'Saving...' : 'Save Address'}
                          </RaisedButton>
                          <FlatButton colortype="primary" onClick={this.toggleAddressForm}>Cancel</FlatButton>
                        </div>
                      </form>
                    </div>
                  )
              }
            </Formik>
          </div>
        }
      </Wrapper>
    )
  }
}

export default CheckoutAddress;