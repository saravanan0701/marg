import React, { Component } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { getAllCountries } from './../../../utils/';
import { RaisedButton, FlatButton, DropDown, RadioButtonSet } from './../../commons/';

const {
  countries,
  defaultCountry,
} = getAllCountries();
const DEFAULT_COUNTRY = defaultCountry;
const COUNTRIES = countries;

const FormWrapper = styled.div`
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
    width: 70%;

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

        & > input, & > textarea, & > div > input {
          border: 1px solid #979797;
          padding: 10px;
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
`

class AddressEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: DEFAULT_COUNTRY,
    }
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

  render() {

    const {
      firstName,
      lastName,
      email,
      saveAddress,
      toggleAddressForm,
    } = this.props;
    const {
      country,
    } = this.state;
    const self = this;

    return (
      <FormWrapper>
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
              if (!values.phone) {
                errors.phone = 'Required';
              } else if (
                !/^[0-9]{10}$/i.test(values.phone)
              ) {
                errors.phone = 'Invalid phone number';
              }
              return errors;
            }
          }
          onSubmit={
            (values, { setSubmitting, resetForm }) => {
              values.streetAddress2 = values.streetAddress1;
              values.country = self.state.country.slug;
              values.countryArea = self.state.state.name;
              values.phone = `+91${values.phone}`;
              const email = values.email;
              delete values.email;
              const addressSaved = saveAddress(values, email);
              if(addressSaved && addressSaved.then) {
                addressSaved.then((success) => {
                  setSubmitting(false);
                  if(success){
                    toggleAddressForm();
                    resetForm();
                  }
                }, () => {
                  setSubmitting(false);
                })
              }
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
                        className="col-12"
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
                        className="col-12"
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
                      <div className="row align-items-center">
                        <div class="col-1">+91</div>
                        <input
                          className="col-11"
                          type="phone"
                          name="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                        />
                      </div>
                      <div className="error">{errors.phone && touched.phone && errors.phone}</div>
                    </div>
                    <div className="label col-12">Your Email</div>
                    <div className="input-container col-12">
                      <input
                        className="col-12"
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
                        className="col-12"
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
                      <FlatButton colortype="primary" onClick={toggleAddressForm}>Cancel</FlatButton>
                    </div>
                  </form>
                </div>
              )
          }
        </Formik>
      </FormWrapper>
    );

  }

}

export default AddressEditForm;