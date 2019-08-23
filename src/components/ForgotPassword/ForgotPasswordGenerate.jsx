import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { Formik } from 'formik';
import { withApollo } from 'react-apollo';

import { FlatButton, RaisedButton } from '../commons';


const GENERATE_RESET_PASSWORD_EMAIL = gql(`
  mutation ResetPasswordEmailMutation($email: String!) {
    customerPasswordReset(input: {email: $email}) {
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

      & > input {
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

class ForgotPasswordGenerate extends Component {

  sendPasswordResetEmail(email) {
    const {
      client,
    } = this.props;

    return client.mutate({
      mutation: GENERATE_RESET_PASSWORD_EMAIL,
      variables: {
        email,
      },
    }).then(({ data: { customerPasswordReset: {errors} = {} } = {} }) => {
      if(errors && errors.length > 0) {
        console.log("Something went wrong.....")
      }
    })
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
                .sendPasswordResetEmail(values.email)
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
                <div className="heading">Forgot password</div>
                <div className="label">Email</div>
                <div className="input-container">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    />
                  <div className="msg">{errors.email && touched.email && errors.email}</div>
                </div>
                <div className="reset-button">
                  <RaisedButton type="submit" colortype="primary" disabled={isSubmitting}>{ isSubmitting ? 'Sending...' : 'Send email'}</RaisedButton>
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
}

export default withApollo(ForgotPasswordGenerate);