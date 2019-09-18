import React, {Component} from 'react';
import gql from 'graphql-tag';
import {withApollo} from 'react-apollo';
import {Mutation} from 'react-apollo';
import {Container, Row, Col} from 'reactstrap';
import styled from 'styled-components';
import {Formik} from 'formik';

import {FlatButton, RaisedButton} from './../commons/';

const Wrapper = styled.div`

  padding-top:50px;

      
      .heading {
        color: #000000;
        font-family: "Cormorant Garamond Medium";
        font-size: ${props => props.theme['$font-size-lg']};
        font-weight: ${props => props.theme['$weight-regular']};
        letter-spacing: 1px;
        line-height: 57px;
        text-align: center;
        padding-bottom: 80px;
      }

      .message-type {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        
        & > div {
          margin-right: 50px;
          margin-bottom: 15px;
        }

        & > div.active {
          color: #000000;
          border-bottom: 1px solid ${props => props.theme.primaryColor}
        }
      }
      form {
        width: 100%;
        max-width: 680px;
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

        .send-message {
          padding-top: 50px;
          align-self: flex-start;
        }
      }
`;

const MESSAGE_TYPES = {
    'GENERAL_ENQUIRY': 'General Enquiry',
    'ADVERTISING': 'Advertising',
    'COLLABORATION': 'Collaboration',
    'JOBS': 'Jobs/Internship',
}

const SEND_CONTACT_ENQUIRY = gql`
  mutation SendContactEnquiry(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $message: String!,
    $contactType: String!
  ) {
    contact(
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      message: $message,
      contactType: $contactType,
    ) {
      sent
      errors {
        field
        message
      }
    }
  }
`

export default class ContactusForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageType: 'GENERAL_ENQUIRY',
        }
        this.setMessageType = this.setMessageType.bind(this);
    }

    submitContactUs(values) {
        const {
            firstName,
            lastName,
            email,
            message,
            contactType,
        } = values
        const {
            messageType
        } = this.state;
        const {
            successNotification,
            errorNotification,
        } = this.props;
        return this.props.client.mutate({
            mutation: SEND_CONTACT_ENQUIRY,
            variables: {
                firstName,
                lastName,
                email,
                message,
                contactType: MESSAGE_TYPES[messageType],
            }
        }).then(({data: {contact: {errors, sent}}}) => {
            if (errors.length === 0) {
                successNotification("We've recieved an email from you, we'll get in touch.")
            } else {
                errorNotification("Error sending email.");
            }
        })
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
                <Container className="my-5">
                  <h1 className="heading">Contact Us</h1>
                  <Row>
                        <Col xs={12}>
                            <Formik
                                initialValues={{firstName: '', lastName: '', email: '', message: ''}}
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
                                    (values, {setSubmitting}) => (
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
                                                    <div className="message-type">
                                                        <FlatButton
                                                            className={messageType == 'GENERAL_ENQUIRY' ? 'active' : ''}
                                                            onClick={() => this.setMessageType('GENERAL_ENQUIRY')}
                                                            colorType="secondary">
                                                            General Enquiry
                                                        </FlatButton>
                                                        <FlatButton
                                                            className={messageType == 'ADVERTISING' ? 'active' : ''}
                                                            onClick={() => this.setMessageType('ADVERTISING')}
                                                            colorType="secondary">
                                                            ADVERTISING
                                                        </FlatButton>
                                                        <FlatButton
                                                            className={messageType == 'COLLABORATION' ? 'active' : ''}
                                                            onClick={() => this.setMessageType('COLLABORATION')}
                                                            colorType="secondary">
                                                            COLLABORATION
                                                        </FlatButton>
                                                        <FlatButton
                                                            className={messageType == 'JOBS' ? 'active' : ''}
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
                                                        <div className="label">First Name</div>
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
                                                        <div className="label">Last Name</div>
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
                                                            <RaisedButton type="submit" colortype="primary"
                                                                          disabled={errors && errors.length > 0 && isSubmitting}>
                                                                {isSubmitting ? 'Sending...' : 'Send message'}
                                                            </RaisedButton>
                                                        </div>
                                                    </form>
                                            </div>
                                        )
                                }
                            </Formik>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col xs={12} md={6} lg={5} xl={4} className="mt-5">
                            <h5 className="mb-3">The Marg Foundation</h5>
                            <p>Army & Navy Building, 3rd Floor <br/>
                                148, Mahatma Gandhi Road<br/>
                                Mumbai 400001, India.</p>
                        </Col>
                        <Col xs={12} md={6} lg={5} xl={4} className="mt-5">
                            <h5 className="mb-3">Email</h5>
                            <p className="mb-1">General Enquiries: <a
                                href="mailto:foundation@marg-art.org">foundation@marg-art.org</a></p>
                            <p className="mb-1">Sales & Marketing: <a
                                href="mailto:sales@marg-art.org">sales@marg-art.org</a></p>
                            <p className="mb-1">Subscriptions: <a
                                href="mailto:subscriptions@marg-art.org">subscriptions@marg-art.org</a></p>
                        </Col>
                        <Col xs={12} md={6} lg={5} xl={4} className="mt-5">
                            <h5>Phone</h5>
                            <p>+91 22 22842520 <br/>
                                +91 22 22821151 <br/>
                                +91 22 22045947</p>
                        </Col>
                    </Row>
                </Container>
            </Wrapper>
        )
    }
}