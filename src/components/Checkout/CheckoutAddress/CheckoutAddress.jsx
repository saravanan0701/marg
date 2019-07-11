import React, { Component } from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
import { Query } from "react-apollo";
import gql from 'graphql-tag';

import { getAllCountries } from './../../../utils/';
import { RaisedButton, FlatButton, DropDown } from './../../commons/';

const Wrapper = styled.div`
  padding: 50px 100px 100px;

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
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        & > div {
          width: 45%;

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

      & > .donate-button {
        margin-top: 30px;
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
    checkoutBillingAddressUpdate(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {
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
`

const {
  countries,
  defaultCountry,
} = getAllCountries();

const DEFAULT_COUNTRY = defaultCountry;
const COUNTRIES = countries;

class CheckoutAddress extends Component {

  constructor(props) {
    super(props);

    this.state = {
      country: DEFAULT_COUNTRY,
      price: 1000,
    };
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
      cart: {
        checkoutId,
      },
      updateShippingAddress,
    } = this.props;
    return client.mutate({
      mutation: SAVE_ADDRESS,
      variables: {
        checkoutId,
        shippingAddress,
      },
    }).then((
      {
        data: {
          checkoutShippingAddressUpdate: {
            checkout: {
              shippingAddress,
            }
          }
        }
      }
    ) => {
      updateShippingAddress(shippingAddress);
      return shippingAddress;
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
    } = this.state;
    const {
      firstName,
      lastName,
      email,
      history: {
        push,
      }
    } = this.props;
    const self = this;

    return (
      <Wrapper>
        <div className="header">
          Shipping Address
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
            (values, { setSubmitting }) => {
              values.streetAddress2 = values.streetAddress1;
              values.country = self.state.country.slug;
              values.countryArea = self.state.state.name;
              delete values.email;
              this
                .saveAddress(values)
                .then(() => this.saveShippingMethod())
                .then(() => setSubmitting(false))
                .then(() => push('/checkout/payment/'))
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
                <div className="address-block">
                  <form onSubmit={handleSubmit}>
                    <div className="label">First Name</div>
                    <div className="input-container">
                      <input
                        type="firstName"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                      />
                      <div className="error">{errors.firstName && touched.firstName && errors.firstName}</div>
                    </div>
                    <div className="label">Last Name</div>
                    <div className="input-container">
                      <input
                        type="lastName"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                      />
                      <div className="error">{errors.lastName && touched.lastName && errors.lastName}</div>
                    </div>
                    <div className="label">Phone</div>
                    <div className="input-container">
                      <input
                        type="phone"
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        />
                      <div className="error">{errors.phone && touched.phone && errors.phone}</div>
                    </div>
                    <div className="label">Your Email</div>
                    <div className="input-container">
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <div className="error">{errors.email && touched.email && errors.email}</div>
                    </div>
                    <div className="label">Address</div>
                    <div className="input-container">
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
                    <div className="horizontal-inputs">
                      <div>
                        <div className="label">City</div>
                        <div className="input-container">
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
                      <div>
                        <div className="label">State</div>
                        <div className="input-container">
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
                    <div className="horizontal-inputs">
                      <div>
                        <div className="label">ZIP/POSTAL CODE</div>
                        <div className="input-container">
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
                      <div>
                        <div className="label">Country</div>
                        <div className="input-container">
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
                    <div className="donate-button">
                      <RaisedButton type="submit" colortype="primary" disabled={isSubmitting}>
                        { isSubmitting ? 'Saving...' : 'Save Address'}
                      </RaisedButton>
                    </div>
                  </form>
                </div>
              )
          }
        </Formik>
      </Wrapper>
    )
  }
}

export default CheckoutAddress;