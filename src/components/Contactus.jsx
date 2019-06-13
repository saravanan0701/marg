import React, { Component } from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { Formik } from 'formik';

import { FlatButton, RaisedButton } from './commons/';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 100px 100px;

  & > div{

    width: 100%;

    & > div.horizontal {
      
      & > .heading {
        color: #000000;
        font-family: "Cormorant Garamond Medium";
        font-size: ${props => props.theme['$font-size-lg']};
        font-weight: ${props => props.theme['$weight-regular']};
        letter-spacing: 1px;
        line-height: 57px;
        padding-bottom: 80px;
      }

      & > .message-type {
        display: flex;
        flex-direction: row;

        & > div {
          margin-right: 50px;
        }

        & > div.active {
          color: #000000;
          border-bottom: 1px solid ${props => props.theme.primaryColor}
        }
      }
      & > form {
        width: 50%;
        display: flex;
        flex-direction: column;

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

          & > input, & > textarea {
            border: 1px solid #cccccc;
            padding: 10px;
            width: 100%
          }

          & > div {
            position: absolute;
            bottom: -22px;
          }
        }

        & > .send-message {
          padding-top: 50px;
          align-self: flex-start;
        }
      }
    }
  }
`;

// TODO:
// 1. Show/hide for password.
// 2. Send (f/l)name to backend.
// 3. Subscriber for newsletter.

class ContactusForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messageType: 'GENERAL_ENQUIRY',
    }
    this.setMessageType = this.setMessageType.bind(this);
  }

  submitContactUs(values) {
    
  }

  setMessageType(messageType) {
    this.setState({
      messageType,
    })
  }

  render() {

    const {
      history: {
        push,
      },
    } = this.props;

    const {
      messageType,
    } = this.state;

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

            if (!values.firstName) {
              errors.firstName = 'Required';
            }
            if (!values.lastName) {
              errors.lastName = 'Required';
            }
            if (!values.message) {
              errors.message = 'Required';
            }
            return errors;
          }}
          onSubmit={
            (values, { setSubmitting }) => (
              this
                .submitContactUs(values)
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
              <div>
                <div className="horizontal">
                  <div className="heading">Contact Us</div>
                  <div className="message-type">
                    <FlatButton
                      className={messageType == 'GENERAL_ENQUIRY'? 'active': ''}
                      onClick={() => this.setMessageType('GENERAL_ENQUIRY')}
                      colorType="secondary">
                      General Enquiry
                    </FlatButton>
                    <FlatButton
                      className={messageType == 'ADVERTISING'? 'active': ''}
                      onClick={() => this.setMessageType('ADVERTISING')}
                      colorType="secondary">
                      ADVERTISING
                    </FlatButton>
                    <FlatButton
                      className={messageType == 'COLLABORATION'? 'active': ''}
                      onClick={() => this.setMessageType('COLLABORATION')}
                      colorType="secondary">
                      COLLABORATION
                    </FlatButton>
                    <FlatButton
                      className={messageType == 'JOBS'? 'active': ''}
                      onClick={() => this.setMessageType('JOBS')}
                      colorType="secondary">
                      JOBS/INTERNSHIP
                    </FlatButton>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="label">Message</div>
                    <div className="input-container">
                      <textarea
                        rows="3"
                        type="message"
                        name="message"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.message}
                        />
                      <div>{errors.message && touched.message && errors.message}</div>
                    </div>
                    <div className="label">First  Name</div>
                    <div className="input-container">
                      <input
                        type="firstName"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        />
                      <div>{errors.firstName && touched.firstName && errors.firstName}</div>
                    </div>
                    <div className="label">Last  Name</div>
                    <div className="input-container">
                      <input
                        type="lastName"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        />
                      <div>{errors.lastName && touched.lastName && errors.lastName}</div>
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
                      <div>{errors.email && touched.email && errors.email}</div>
                    </div>
                    <div className="send-message">
                      <RaisedButton type="submit" colortype="primary" disabled={isSubmitting}>
                        { isSubmitting ? 'Sending...' : 'Send message'}
                      </RaisedButton>
                    </div>
                  </form>
                </div>
              </div>
            )
          }
        </Formik>
      </Wrapper>
    )
  }
}

export default withApollo(ContactusForm);