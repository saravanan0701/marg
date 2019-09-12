import React, { Component } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Formik } from 'formik';
import queryString from 'query-string';

import { FlatButton, RaisedButton, PasswordInput } from '../../commons';


const RESET_PASSWORD = gql(`
  mutation ResetPasswordMutation($id: ID!, $token: String!, $password:String!) {
    setPassword(id:$id,input:{token:$token,password:$password}) {
      errors {
        message 
      }
    }
  }
`);

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
    padding: 100px;
  }

  & > form{
    width: 100%;
    display: flex;
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      width: 50%;
    }
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

      input {
        border: 1px solid #cccccc;
        padding: 10px;
        width: 100%
      }

      & > div.msg {
        color: ${props => props.theme.primaryColor};
        padding: 5px;
        position: absolute;
        bottom: -30px;
      }
    }

    & > .reset-button {
      align-self: flex-start;
      padding-top: 30px;
    }

    & > .signup {
      padding-top: 20px;
      display: flex;
      flex-direction: row;

      & > div.button {
        padding-left: 10px;
      }
    }
  }
`;

export default ({ client, location:{ search }, history: { push }, errorNotification, successNotification }) => {

  const sendPasswordResetEmail = (password) => {
    const { uid:id, token } = queryString.parse(search);
    return client.mutate({
      mutation: RESET_PASSWORD,
      variables: {
        id,
        token,
        password
      },
    }).then(({ data: { setPassword: {errors} = {} } = {} }) => {
      if(errors && errors.length > 0) {
        return errorNotification(errors[0].message);
      } else {
        return successNotification("Password has been reset.");
      }
    }, (err) => errorNotification("Something went wrong, please try again!"))
  }

  return (
    <Wrapper>
      <Formik
        initialValues={{ password1: '', password2: '' }}
        validate={values => {
          const errors = {};
          if(!values.password1 || !values.password2 || values.password1 !== values.password2) {
            errors.passwordDonotMatch = true;
          }
          return errors;
        }}
        onSubmit={
          (values, { setSubmitting }) => (
            sendPasswordResetEmail(values.password1)
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
                <div className="heading">Reset password</div>
                <div className="label">New password</div>
                <div className="input-container">
                  <PasswordInput
                    type="password"
                    name="password1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </div>
                <div className="label">Confirm password</div>
                <div className="input-container">
                  <PasswordInput
                    name="password2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <div className="msg">{
                    errors.passwordDonotMatch && touched.password1 && touched.password2 && 
                      "Passwords donot match!"
                  }</div>
                </div>
                <div className="reset-button">
                  <RaisedButton
                    type="submit"
                    colortype="primary"
                    disabled={isSubmitting && errors.passwordDonotMatch}
                    >
                    {isSubmitting ? 'Saving...' : 'Reset'}
                  </RaisedButton>
                </div>
                <div className="signup">
                  <div>Have an account? </div>
                  <FlatButton
                    onClick={
                      () => {
                        return push(`/login`)
                      }
                    }
                    className="button"
                  >
                    Login
                  </FlatButton>
                </div>
                <div className="signup">
                  <div>Don’t have an account? </div>
                  <FlatButton
                    onClick={
                      () => {
                        return push(`/signup`)
                      }
                    }
                    className="button"
                  >
                    Register
                  </FlatButton>
                </div>
              </form>
            )
        }
      </Formik>
    </Wrapper>
  )
}