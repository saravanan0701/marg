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
          color: #ec1d24;
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
      saveLabel,
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
            firstName:firstName?firstName:"",
            lastName:lastName?lastName:"",
            email:email?email:"",
            phone:"",
            city:"",
            streetAddress1:"",
            postalCode:"",
          }}
          validate={
            values => {
              const errors = {};
              if(!values.firstName) {
                errors.firstName = 'First name is mandatory';
              }
              if(!values.lastName) {
                errors.lastName = 'Last name is mandatory';
              }
              if (!values.email) {
                errors.email = 'Email is mandatory';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              if (!values.phone) {
                errors.phone = 'Phone is mandatory';
              } else if (
                !/^\+{0,1}[0-9]{0,2}[0-9]{10}$/i.test(values.phone)
              ) {
                errors.phone = 'Invalid phone number, valid format +421234567890 or 9999999999';
              }
              if(!values.postalCode) {
                errors.postalCode = 'Postal code is mandatory';
              } else if(
                !/^[0-9]+$/i.test(values.postalCode)
              ) {
                errors.postalCode = 'Postal code format is incorrect';
              }
              if(!values.city) {
                errors.city = 'City is mandatory';
              }
              if(!values.streetAddress1) {
                errors.streetAddress1 = 'Address is mandatory';
              }
              if(!self.state.state) {
                errors.state = 'State is mandatory';
              } else {
                delete errors.state;
              }
              return errors;
            }
          }
          onSubmit={
            (values, { setSubmitting, resetForm, setErrors }) => {
              if(!self.state.state) {
                setSubmitting(false);
                return setErrors({
                  state: "State is mandatory",
                })
              }
              const retVals = {...values}
              retVals.streetAddress2 = retVals.streetAddress1;
              retVals.country = self.state && self.state.country ? self.state.country.slug: null;
              retVals.countryArea = self.state && self.state.state? self.state.state.name: null;
              if(retVals.phone.length === 10) {
                retVals.phone = `+91${retVals.phone}`;
              }
              const email = retVals.email;
              delete retVals.email;
              const addressSaved = saveAddress(retVals, email);

              if(addressSaved && addressSaved.then) {
                addressSaved.then((success) => {
                  setSubmitting(false);
                  if(success){
                    toggleAddressForm();
                    resetForm();
                  }
                }).catch((errors) => {
                  errors.forEach(({field, message}) => {
                    const err = {};
                    err[field] = message;
                    setErrors(err);
                  });
                  setSubmitting(false);
                })
              } else {
                setSubmitting(false);
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
                      <input
                        className="col-12"
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
                        className="col-12"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email || ""}
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
                            showSelectedOption={false}
                            className="dropdown"
                            onOptionSelect={(val) => this.selectState(val)} />
                          <div className="error">{errors.state && errors.state}</div>
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
                            showSelectedOption={false}
                            className="dropdown"
                            onOptionSelect={(val) => this.selectCountry(val)} />
                        </div>
                      </div>
                    </div>
                    <div className="actions row align-items-center col-12 justify-content-around">
                      <RaisedButton type="submit" colortype="primary" disabled={isSubmitting}>
                        { isSubmitting ? 'Saving...' : saveLabel}
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