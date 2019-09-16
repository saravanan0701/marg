import React, { Component } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { getAllCountries } from "./../../../utils/";
import {
  RaisedButton,
  FlatButton,
  DropDown,
  RadioButtonSet
} from "./../../commons/";

const { countries, defaultCountry } = getAllCountries();
const DEFAULT_COUNTRY = defaultCountry;
const COUNTRIES = countries;

const FormWrapper = styled.div`
  & > .header {
    font-family: "Cormorant Garamond Medium";
    font-size: ${props => props.theme["$font-size-lg"]};
    font-weight: ${props => props.theme["$weight-regular"]};
    letter-spacing: 1px;
    line-height: 57px;
  }

  & > .description {
    font-size: ${props => props.theme["$font-size-xxs"]};
    font-weight: ${props => props.theme["$weight-regular"]};
    letter-spacing: 0.59px;
    line-height: 23px;
    width: 55%;
  }

  input,
  textarea {
    border: 1px solid #979797;
    border-radius: 0;
    padding: 10px 10px !important;
    outline: none;
    box-shadow: none;
    height: unset;

    &:focus {
      border: 1px solid #979797;
      box-shadow: none;
    }
  }

  label {
    color: #000000;
    font-size: ${props => props.theme["$font-size-xxs"]};
    font-weight: ${props => props.theme["$weight-bold"]};
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .dropdown {
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

  & > div.address-block {
    max-width: 500px;

    & > form {
      & .label {
        color: #000000;
        font-size: ${props => props.theme["$font-size-xxs"]};
        font-weight: ${props => props.theme["$weight-bold"]};
        letter-spacing: 3px;
        text-transform: uppercase;
        padding-bottom: 10px;
        padding-top: 50px;
      }
      & .input-container {
        position: relative;

        & > input,
        & > textarea,
        & > div > input {
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
          .dropdown {
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
`;

class AddressEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: DEFAULT_COUNTRY
    };
  }

  selectCountry(country) {
    this.setState({
      country
    });
  }

  selectState(state) {
    this.setState({
      state
    });
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      saveAddress,
      toggleAddressForm,
      saveLabel = "SAVE ADDRESS",
      showCancel = true
    } = this.props;
    const { country } = this.state;
    const self = this;

    return (
      <FormWrapper>
        <Formik
          enableReinitialize
          initialValues={{
            firstName: firstName ? firstName : "",
            lastName: lastName ? lastName : "",
            email: email ? email : "",
            phone: "",
            city: "",
            streetAddress1: "",
            postalCode: ""
          }}
          validate={values => {
            const errors = {};
            if (!values.firstName) {
              errors.firstName = "First name is mandatory";
            }
            if (!values.lastName) {
              errors.lastName = "Last name is mandatory";
            }
            if (!values.email) {
              errors.email = "Email is mandatory";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.phone) {
              errors.phone = "Phone is mandatory";
            }
            if (!values.postalCode) {
              errors.postalCode = "Postal code is mandatory";
            } else if (!/^[0-9]+$/i.test(values.postalCode)) {
              errors.postalCode = "Postal code format is incorrect";
            }
            if (!values.city) {
              errors.city = "City is mandatory";
            }
            if (!values.streetAddress1) {
              errors.streetAddress1 = "Address is mandatory";
            }
            if (!self.state.state) {
              errors.state = "State is mandatory";
            } else {
              delete errors.state;
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
            if (!self.state.state) {
              setSubmitting(false);
              return setErrors({
                state: "State is mandatory"
              });
            }
            const retVals = { ...values };
            retVals.streetAddress2 = retVals.streetAddress1;
            retVals.country =
              self.state && self.state.country ? self.state.country.slug : null;
            retVals.countryArea =
              self.state && self.state.state ? self.state.state.name : null;
            const email = retVals.email;
            delete retVals.email;
            const addressSaved = saveAddress(retVals, email);

            if (addressSaved && addressSaved.then) {
              addressSaved
                .then(success => {
                  setSubmitting(false);
                  if (success) {
                    toggleAddressForm();
                    resetForm();
                  }
                })
                .catch(errors => {
                  const err = {};
                  errors.forEach(({ field, message }) => {
                    err[field] = message;
                  });
                  setErrors(err);
                  setSubmitting(false);
                });
            } else {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <div className="address-block row">
              <div className="col-12">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-5">
                    <label for="firstName">First Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                    />
                    <small className="error form-text text-muted">
                      {errors.firstName &&
                        touched.firstName &&
                        errors.firstName}
                    </small>
                  </div>

                  <div className="form-group mb-5">
                    <label for="lasttName">Last Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                    />
                    <small className="error form-text text-muted">
                      {errors.lastName && touched.lastName && errors.lastName}
                    </small>
                  </div>

                  <div className="form-group mb-5">
                    <label for="phone">Phone</label>
                    <input
                      className="form-control"
                      type="text"
                      name="phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                    />
                    <small className="error form-text text-muted">
                      {errors.phone && touched.phone && errors.phone}
                    </small>
                  </div>

                  <div className="form-group mb-5">
                    <label for="email">Email</label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email || ""}
                    />
                    <small className="error form-text text-muted">
                      {errors.email && touched.email && errors.email}
                    </small>
                  </div>

                  <div className="form-group mb-5">
                    <label for="streetAddress1">Address</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="streetAddress1"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.streetAddress1}
                    />
                    <small className="error form-text text-muted">
                      {errors.streetAddress1 &&
                        touched.streetAddress1 &&
                        errors.streetAddress1}
                    </small>
                  </div>

                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <div className="form-group mb-5">
                        <label for="city">City</label>
                        <input
                          type="text"
                          name="city"
                          className="form-control"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.city}
                        />
                        <small className="error form-text text-muted">
                          {errors.city && touched.city && errors.city}
                        </small>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group mb-5">
                        <label for="postalCode">ZIP/Postal Code</label>
                        <input
                          type="text"
                          name="postalCode"
                          className="form-control"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.postalCode}
                        />
                        <small className="error form-text text-muted">
                          {errors.postalCode &&
                            touched.postalCode &&
                            errors.postalCode}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label for="state">State</label>
                        <DropDown
                          name="state"
                          onClick={e => e.preventDefault()}
                          enableSearch="true"
                          loadData={country.states}
                          showSelectedOption={false}
                          className="dropdown"
                          onOptionSelect={val => this.selectState(val)}
                        />
                        <small className="error form-text text-muted">
                          {errors.state && errors.state}
                        </small>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label for="country">Country</label>
                        <DropDown
                          name="country"
                          onClick={e => e.preventDefault()}
                          defaultOption={country}
                          enableSearch="true"
                          loadData={COUNTRIES}
                          showSelectedOption={false}
                          className="dropdown"
                          onOptionSelect={val => this.selectCountry(val)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="actions row align-items-center col-12 justify-content-around">
                    <RaisedButton
                      type="submit"
                      colortype="primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : saveLabel}
                    </RaisedButton>
                    {showCancel && (
                      <FlatButton
                        colortype="primary"
                        onClick={toggleAddressForm}
                      >
                        Cancel
                      </FlatButton>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </Formik>
      </FormWrapper>
    );
  }
}

export default AddressEditForm;
