import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { Formik } from 'formik';

import { FlatButton, RaisedButton } from './../commons/';


const GET_AUTH_TOKEN = gql(`
  mutation LoginMutation($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token,
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
  display: flex;
  flex-direction: row;
  padding: 100px 100px;

  & > form{
    width: 50%;
    display: flex;
    flex-direction: column;

    & > .heading {
      color: #000000;
      font-family: "Cormorant Garamond Medium";
      font-size: ${props => props.theme['$font-size-lg']};
      font-weight: ${props => props.theme['$weight-bold']};
      letter-spacing: 1px;
      line-height: 57px;
      padding-bottom: 30px;
    }

    & > .label {
      color: #000000;
      font-size: ${props => props.theme['$font-size-xxs']};
      font-weight: ${props => props.theme['$weight-bold']};
      letter-spacing: 3px;
      text-transform: uppercase;
      padding-bottom: 15px;
      padding-top: 50px;
    }

    & > .input-container {

      position: relative;

      & > input {
        border: 1px solid #cccccc;
        padding: 10px;
        width: 100%
      }

      & > div {
        position: absolute;
        bottom: -22px;
      }
    }

    & > .forgot-button {
      align-self: flex-end;
      padding-top: 10px;
      padding-right: 0px !important;
    }

    & > .login-button {
      align-self: flex-start;
    }

    & > .signup {
      padding-top: 50px;
      display: flex;
      flex-direction: row;

      & > div.button {
        padding-left: 10px;
      }
    }
  }
`;

export default class Login extends Component {

  handleLogin(data) {
    if (data.tokenCreate.errors && data.tokenCreate.errors.length > 0) {
      return this.props.loginFailure();
    }
    const { token, user: { email } } = data.tokenCreate;
    this.props.loginSuccess({
      email: email,
      authToken: token
    });
  }

  loginAttempt(values) {
    const {
      client,
    } = this.props;
    return client.mutate({
      mutation: GET_AUTH_TOKEN,
      variables: values,
    }).then(({ data }) => this.handleLogin(data));
  }

  componentDidUpdate() {
    const {
      email,
      history: {
        location: {
          search,
        },
        push,
      },
    } = this.props;
    if(email && search) {
      //User has loggedin
      let returnUrl = search
        .slice(1)
        .split('&')
        .map(q => q.split('='))
        .reduce((retPath, it) => {
          if(it[0] == "returnUrl") {
            return it[1];
          }
          return retPath;
        }, null);
      push(returnUrl == null? "/": returnUrl);
    }
  }

  render() {

    return (
      <Wrapper>
        <Formik
          initialValues={{email: '', password: ''}}
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
              <form onSubmit={handleSubmit}>
                <div className="heading">Sign In</div>
                <div className="label">Email</div>
                <div className="input-container">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    />
                  <div>{errors.email && touched.email && errors.email}</div>
                </div>
                <div className="label">Password</div>
                <div className="input-container">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    />
                  <div>{errors.password && touched.password && errors.password}</div>
                </div>
                <FlatButton className="forgot-button">Forgot password</FlatButton>
                <div className="login-button">
                  <RaisedButton type="submit" colortype="primary" disabled={isSubmitting}>{ isSubmitting ? 'Logging in...' : 'Sign in'}</RaisedButton>
                </div>
                <div className="signup">
                  <div>Don’t have an account? </div>
                  <FlatButton className="button">Register</FlatButton>
                </div>
              </form>
            )
          }
        </Formik>
      </Wrapper>
    )
  }
}