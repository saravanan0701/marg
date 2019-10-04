import React, {Component} from 'react';
import gql from 'graphql-tag';
import {withApollo} from 'react-apollo';
import {Mutation} from 'react-apollo';
import styled from 'styled-components';
import {Formik} from 'formik';

import {FlatButton, RaisedButton, PasswordInput} from './../commons/';


const SIGNUP = gql(`
  mutation SignupMutation($user: CustomerRegisterInput!) {
    customerRegister(input: $user) {
      user {
        email
      }
      errors {
        message 
      }
    }
  }
`);

const Wrapper = styled.div`
form {
  .heading {
    color: #000000;
    font-family: "Cormorant Garamond Medium";
    font-size: ${props => props.theme['$font-size-lg']};
    font-weight: ${props => props.theme['$weight-bold']};
    letter-spacing: 1px;
    line-height: 57px;
    padding-bottom: 30px;
  }

  .label {
    color: #000000;
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-bold']};
    letter-spacing: 3px;
    text-transform: uppercase;
    padding-bottom: 15px;
    padding-top: 50px;
  }

  .input-container {
    position: relative;
    input {
      border: 1px solid #cccccc;
      padding: 10px;
      width: 100%
    }

    .input-errors {
      position: absolute;
      bottom: -22px;
    }
  }

  .forgot-button {
    align-self: flex-end;
    padding-top: 10px;
    padding-right: 0px !important;
  }

  .login-button {
    padding-top: 50px;
    align-self: flex-start;
  }
}

div {
  .lower-comments {
    display: flex;
    flex-direction: row;

    div.button {
      padding-left: 10px;
    }
  }
  .signup {
    padding-top: 50px;
  }
  .institution {
    padding-top: 10px;
  }
}

`;


class SignupForm extends Component {

  loginAttempt(values) {
    const {
      client,
      history: {
        location: {
          search,
        },
        push,
      }
    } = this.props;
    return client.mutate({
      mutation: SIGNUP,
      variables: {
        user: {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName
        },
      },
    }).then(({ data, errors }) => {
      if (!errors) {
        push("/login");
      }
      ;
    });
  }

  render() {

    const {
      history: {
        push,
      },
    } = this.props;

    return (
      <Wrapper>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
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
                <div className="container my-5">
                  <h1 className="heading">Register with Marg</h1>
                  <div className="row">
                    <div className="col-12 col-md-8 offset-lg-1 col-lg-5">
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
                          <div
                            className="input-errors">{errors.firstName && touched.firstName && errors.firstName}</div>
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
                          <div
                            className="input-errors">{errors.lastName && touched.lastName && errors.lastName}</div>
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
                          <div
                            className="input-errors">{errors.email && touched.email && errors.email}</div>
                        </div>
                        <div className="label">Create Password</div>
                        <div className="input-container">
                          <PasswordInput
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <div
                            className="input-errors">{errors.password && touched.password && errors.password}</div>
                        </div>
                        <div className="login-button">
                          <RaisedButton type="submit" colortype="primary"
                            disabled={isSubmitting}>
                            {isSubmitting ? 'Registering...' : 'Register'}
                          </RaisedButton>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="row">
                    <div className="offset-lg-1 col-12 lower-comments signup">
                      <div>Already have an account?</div>
                      <FlatButton
                        className="button"
                        onClick={
                          () => {
                            return push(`/login`)
                          }
                        }
                      >
                        Sign in
                      </FlatButton>
                    </div>
                    <div className="offset-lg-1 col-12 lower-comments institution">
                      <div>Looking to register your institution?</div>
                      {/*<FlatButton className="button">View institutional plans</FlatButton>*/}
                    </div>
                  </div>
                </div>
              )
          }
        </Formik>
      </Wrapper>
    )
  }
}

export default withApollo(SignupForm);