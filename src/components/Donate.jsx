import React, { Component } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { getAllCountries } from './../utils/';
import { Link } from 'react-router-dom';
import { RaisedButton, FlatButton, DropDown } from './commons/';

const Wrapper = styled.div`
  padding: 50px 100px 100px;

  & > .header {
    font-family: "Cormorant Garamond Medium";
    font-size: ${props => props.theme['$font-size-lg']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 1px;
    line-height: 57px;
    padding-bottom: 30px;
  }

  & > .description {
    font-size: ${props => props.theme['$font-size-xxs']};;
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 0.59px;
    line-height: 23px;
    width: 55%;

    & > .email {
      color: ${props => props.theme.primaryColor};
    }
  }

  & > .price-selector {
    width: 55%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 50px;

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
const {
  countries,
  defaultCountry,
} = getAllCountries();

const DEFAULT_COUNTRY = defaultCountry;
const COUNTRIES = countries;

//TODO: 
// 1. Validation
class Donate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      country: DEFAULT_COUNTRY,
      price: 1000,
    }
  }

  selectCountry(country) {
    this.setState({
      country,
    })
  }

  selectState(state) {
    //TODO:
  }

  selectPrice(price) {
    this.setState({
      price,
    })
  }

  render() {
    const {
      country,
      price,
    } = this.state;

    return (
      <Wrapper>
        <div className="header">
          Donate to the Marg Foundation
        </div>
        <div className="description">
          If you enjoy the work we do and appreciate our no-paywall approach to sharing knowledge of India's arts and cultures, please consider making a donation to support our team. The Marg Foundation is a non-profit organisation registered in India under the Societies Registration Act of 1860. As such, any donations made to Marg are eligible for tax benefits under Section 80G of the Income Tax Act. For any queries, comments, or feedback, please write to us at <span className="email">contact@marg-art.org</span>
        </div>
        <div className="price-selector">
          <div
            className={price == 500? 'active price': 'price'}
            onClick={ (e) => this.selectPrice(500) }
            >
            Rs. 500
          </div>
          <div
            className={price == 1000? 'active price': 'price'}
            onClick={ (e) => this.selectPrice(1000) }
            >
            Rs. 1,000
          </div>
          <div
            className={price == 5000? 'active price': 'price'}
            onClick={ (e) => this.selectPrice(5000) }
            >
            Rs. 5,000
          </div>
          <div
            className={price == 10000? 'active price': 'price'}
            onClick={ (e) => this.selectPrice(10000) }
            >
            Rs. 10,000
          </div>
          <div
            className={price == 20000? 'active price': 'price'}
            onClick={ (e) => this.selectPrice(20000) }
            >
            Rs. 20,000
          </div>
          <div
            className={price == 50000? 'active price': 'price'}
            onClick={ (e) => this.selectPrice(50000) }>
            Rs. 50,000
          </div>
        </div>
        <Formik
          initialValues={{email: '', password: ''}}
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
            (values, { setSubmitting }) => (
              this
                .loginAttempt(values)
                .then(() => setSubmitting(false))
            )
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
                      <div className="error">{errors.amount && touched.amount && errors.amount}</div>
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
                            type="pincode"
                            name="pincode"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.pincode}
                          />
                          <div className="error">{errors.pincode && touched.pincode && errors.pincode}</div>
                        </div>
                      </div>
                      <div>
                        <div className="label">Country</div>
                        <div className="input-container">
                          <DropDown
                            defaultOption={country}
                            enableSearch="true"
                            loadData={COUNTRIES}
                            showSelectedOption="true"
                            className="dropdown"
                            onOptionSelect={(val) => this.selectCountry(val)} />
                        </div>
                      </div>
                    </div>
                    <div className="label">Pan Number</div>
                    <div className="input-container">
                      <input
                        type="pan"
                        name="pan"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.pan}
                      />
                      <div className="error">{errors.pan && touched.pan && errors.pan}</div>
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
                      <RaisedButton type="submit" colortype="primary" disabled={isSubmitting}>
                        { isSubmitting ? 'Saving...' : price?`Donate Rs. ${price}`: `Donate`}
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

export default Donate;
