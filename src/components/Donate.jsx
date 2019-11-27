import React, { Component } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { withApollo } from "react-apollo";
import { withRouter } from "react-router";
import gql from "graphql-tag";
import { getAllCountries } from './../utils/';
import { connect } from 'react-redux'
import actions from './../actions'

import { RaisedButton, FlatButton, DropDown } from './commons/';
import logo from "./../images/logo.png";

const Wrapper = styled.div`
  @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
    padding: 50px 100px 100px;
  }

  & > .header {
    font-family: ${props => props.theme['$font-secondary-medium']};
    font-size: ${props => props.theme['$font-size-lg']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 1px;
    line-height: 57px;
    padding: 50px;
    text-align: center;
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      text-align: left;
      padding: 0px;
      padding-bottom: 30px;
    }
  }

  & > .description {
    font-size: ${props => props.theme['$font-size-xxs']};;
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 0.59px;
    line-height: 23px;
    width: 100%;

    & > .email {
      color: ${props => props.theme.primaryColor};
    }
  }

  & > .price-selector {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 50px;
    width: 100%;
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      width: 55%;
    }

    & > .price {
      width: 31%;
      cursor: pointer;
      color: ${props => props.theme.primaryColor};
      border: 1px solid #979797;
      padding: 10px;
      margin-bottom: 10px;
      text-align: center;
    }

    & > .price:hover, & > .price.active {
      background-color: #ffeeee;
    }
  }

  & > div.horizontal {

    width: 100%;
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      width: 55%;
    }

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
        margin-bottom: 30px;
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

const MAKE_DONATION = gql`
  mutation MakeDonation(
    $amount: Int!,
    $name: String!,
    $email: String!,
    $phone: String!,
    $address: String!,
    $city: String!,
    $state: String!,
    $zipcode: String!,
    $country: String!,
    $panNumber: String!,
    $paymentId: String!,
    $message: String
  ) {
    makeDonation(input: {
      amount: $amount,
      name: $name,
      email: $email,
      phone: $phone,
      address: $address,
      city: $city,
      state: $state,
      country: $country,
      zipcode: $zipcode,
      panNumber: $panNumber,
      paymentId: $paymentId,
      message: $message
    }) {
      errors{
        message
        field
      }
    }
  }
`;


class Donate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      country: DEFAULT_COUNTRY,
      amount: 1000,
      loading: false,
    }

    this.RAZORPAY_OPTIONS = {
      key: `${process.env.REACT_APP_RAZORPAY_KEY}`,
      name: "Marg",
      image: logo,
      prefill: {
        email: this.props.email,
        "name": `${this.props.firstName} ${this.props.lastName}`,
      },
      theme: {
        color: "#F37254"
      },
      modal: {
        ondismiss: function() {
        }
      }
    };
  }

  selectCountry(country) {
    this.setState({
      country,
    })
  }

  selectState(state) {
    //TODO:
  }

  selectPrice(amount) {
    this.setState({
      amount,
    })
  }

  render() {
    const {
      country,
      amount,
      loading,
    } = this.state;
    const {
      email,
      firstName,
      lastName,
      client,
      successNotification,
      errorNotification,
      history: {
        push,
      },
    } = this.props;
    const RAZORPAY_OPTIONS = this.RAZORPAY_OPTIONS;

    return (
      <Wrapper>
        <div className="header">
          Donate to the Marg Foundation
        </div>
        <div className="description">
          As a not-for-profit organization, Marg looks to institutions and individuals with a stake in the arts to support our projects. If you have valued engaging with Marg, please contribute and be a part of our mission. The Marg Foundation is registered in India under the Societies Registration Act of 1860. As such, any donations made to Marg are eligible for tax benefits under Section 80G of the Income Tax Act. For any queries, comments or feedback please write to us at:&nbsp;<span className="email">contact@marg-art.org</span>
        </div>
        <div className="price-selector">
          <div
            className={amount == 500? 'active price': 'price'}
            onClick={ (e) => this.selectPrice(500) }
            >
            Rs. 500
          </div>
          <div
            className={amount == 1000? 'active price': 'price'}
            onClick={ (e) => this.selectPrice(1000) }
            >
            Rs. 1,000
          </div>
          <div
            className={amount == 5000? 'active price': 'price'}
            onClick={ (e) => this.selectPrice(5000) }
            >
            Rs. 5,000
          </div>
          <div
            className={amount == 10000? 'active price': 'price'}
            onClick={ (e) => this.selectPrice(10000) }
            >
            Rs. 10,000
          </div>
          <div
            className={amount == 20000? 'active price': 'price'}
            onClick={ (e) => this.selectPrice(20000) }
            >
            Rs. 20,000
          </div>
          <div
            className={amount == 50000? 'active price': 'price'}
            onClick={ (e) => this.selectPrice(50000) }>
            Rs. 50,000
          </div>
        </div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            amount,
            email,
            country,
            name: `${firstName? firstName: ""} ${lastName? lastName: ""}`,
          }}
          validate={
            values => {
              const errors = {};
              if(!values.amount) {
                errors.amount = 'Required';
              } else if(!/^[0-9]+$/i.test(values.amount)) {
                errors.amount = 'Should only contain numbers, eg: 100'
              } else if(values.amount <= 0) {
                errors.amount = 'Should be more than 0'
              }
              if(!values.name) {
                errors.name = 'Required';
              }
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              if(!values.address) {
                errors.address = 'Required';
              }
              if(!values.city) {
                errors.city = 'Required';
              }
              if(!values.state) {
                errors.state = 'Required';
              }
              if(!values.zipcode) {
                errors.zipcode = 'Required';
              }
              if(!values.country) {
                errors.country = 'Required';
              }
              if(!values.panNumber) {
                errors.panNumber = 'Required';
              }
              return errors;
            }
          }
          onSubmit={
            (values, { setSubmitting }) => {
              this.setState({
                loading: true,
              });
              RAZORPAY_OPTIONS.prefill.email = values.email;
              RAZORPAY_OPTIONS.prefill.contact = values.phone;
              RAZORPAY_OPTIONS.currency = "INR";
              RAZORPAY_OPTIONS.amount = values.amount * 100;
              RAZORPAY_OPTIONS.handler = function(response) {
                  if (response.razorpay_payment_id) {
                    client.mutate({
                      mutation: MAKE_DONATION,
                      variables: {
                        ...values,
                        state: values.state.name,
                        country: values.country.name,
                        amount: values.amount * 100,
                        paymentId: response.razorpay_payment_id
                      }
                    }).then(({data: {makeDonation: { errors } = {} } = {} }) => {
                      this.setState({
                        loading: true,
                      });
                      if(errors.length > 0) {
                        return errorNotification("Something went wrong, please try again later.")
                      }
                      successNotification("Thank you for your donation.")
                      push("categories");
                    }).catch(() => {
                      this.setState({
                        loading: true,
                      });
                      return errorNotification("Something went wrong, please try again later.")
                    })
                  }
              }
              const razpay = new window.Razorpay(RAZORPAY_OPTIONS);
              razpay.open();
              return setSubmitting(false);
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
                <div className="horizontal">
                  <form onSubmit={handleSubmit}>
                    <div className="label">ENTER ANY OTHER AMOUNT (Rs.)</div>
                    <div className="input-container">
                      <input
                        type="amount"
                        name="amount"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.amount}
                      />
                      <div className="error">{errors.amount}</div>
                    </div>
                    <div className="label">First and Last Name</div>
                    <div className="input-container">
                      <input
                        type="name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      <div className="error">{errors.name && touched.name && errors.name}</div>
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
                        type="address"
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                      />
                      <div className="error">{errors.address && touched.address && errors.address}</div>
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
                            enableSearch="true"
                            loadData={country.states}
                            showSelectedOption={false}
                            className="dropdown"
                            onOptionSelect={(val) => {
                              values.state = val;
                              this.selectState(val)}
                            } />
                        </div>
                      </div>
                    </div>
                    <div className="horizontal-inputs">
                      <div>
                        <div className="label">ZIP/POSTAL CODE</div>
                        <div className="input-container">
                          <input
                            rows="3"
                            type="zipcode"
                            name="zipcode"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.zipcode}
                          />
                          <div className="error">{errors.zipcode && touched.zipcode && errors.zipcode}</div>
                        </div>
                      </div>
                      <div>
                        <div className="label">Country</div>
                        <div className="input-container">
                          <DropDown
                            defaultOption={country}
                            enableSearch="true"
                            loadData={COUNTRIES}
                            showSelectedOption={false}
                            className="dropdown"
                            onOptionSelect={(val) => {
                              values.country = val;
                              this.selectCountry(val)
                            }} />
                        </div>
                      </div>
                    </div>
                    <div className="label">Pan Number</div>
                    <div className="input-container">
                      <input
                        type="panNumber"
                        name="panNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.panNumber}
                      />
                      <div className="error">{errors.panNumber && touched.panNumber && errors.panNumber}</div>
                    </div>
                    <div className="label">Message</div>
                    <div className="input-container">
                      <textarea
                        type="message"
                        name="message"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.message}
                      />
                      <div className="error">{errors.message && touched.message && errors.message}</div>
                    </div>
                    <div className="donate-button">
                      <RaisedButton type="submit" colortype="primary" disabled={Object.keys(errors).length > 0 || isSubmitting || loading}>
                        { loading ? 'Saving...' : amount?`Donate Rs. ${values.amount}`: `Donate`}
                      </RaisedButton>
                    </div>
                  </form>
                </div>
              )
          }
        </Formik>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({
  auth: {
    email,
    firstName,
    lastName
  }
}, ownProps) => ({
  email,
  firstName,
  lastName,
});

const mapDispatchToProps = (dispatch) => ({
  successNotification: (message) => dispatch(actions.successNotification(message)),
  errorNotification: (message) => dispatch(actions.errorNotification(message)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withApollo(
    withRouter(
      Donate
    )
  )
);
