import React, { useState } from "react";
import gql from "graphql-tag";
import { Container, Row, Col } from "reactstrap";
import AddressBox from "../Checkout/CheckoutAddress/AddressBox";
import FlatButton from "../commons/FlatButton";
import RaisedButton from "../commons/RaisedButton";

const SAVE_NEW_ADDRESS = gql`
  mutation SaveAddress($input: AddressInput!) {
    customerAddressCreate(input: $input) {
      errors {
        field
        message
      }
      address {
        id
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        cityArea
        postalCode
        country {
          country
          code
        }
        countryArea
        phone
      }
    }
  }
`;

const UPDATE_PERSONAL_DETAILS = gql`
  mutation UpdatePersonalDetails($id: ID!, $input: CustomerInput!) {
    customerUpdate(id: $id, input: $input) {
      errors {
        message
      }
      user {
        firstName
        lastName
        email
      }
    }
  }
`;

const Profile = ({
  children,
  value,
  index,
  client,
  addNewAddress,
  id,
  addresses,
  firstName,
  lastName,
  email,
  updateUserName,
  updateUserEmail,
  ...other
}) => {
  const [editingName, setEditingName] = useState(false);
  const [firstNameInputValue, setFirstNameInputValue] = useState(firstName);
  const [lastNameInputValue, setLastNameInputValue] = useState(lastName);

  const [editingEmail, setEditingEmail] = useState(false);
  const [emailInputValue, setEmailInputValue] = useState(email);

  const saveAddress = newAddress => {
    return client
      .mutate({
        mutation: SAVE_NEW_ADDRESS,
        variables: {
          input: newAddress
        }
      })
      .then(({ data: { addressCreate: { address, errors } } }) => {
        if (errors && errors.length > 0) {
          alert("Oops! Something went wrong. Please try again.");
          return false;
        }
        alert("Address saved successfully!");
        addNewAddress(address);
        return address;
      });
  };

  const updatePersonalDetails = details => {
    return client
      .mutate({
        mutation: UPDATE_PERSONAL_DETAILS,
        variables: {
          id: id,
          input: details
        }
      })
      .then(({ data: { customerUpdate: { user, errors } = {} } = {} } = {}) => {
        if (errors && errors.length > 0) {
          alert("Oops! Something went wrong. Please try again.");
          return false;
        }
        updateUserEmail(user);
        updateUserName(user);
        setEditingEmail(false);
        setEditingName(false);
        alert("Your detauls have been successfully saved!");
        return user;
      });
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      <Container className="mb-5">
        <h4>MY ACCOUNT</h4>
        <hr />
        <Row>
          {/* FIRST & LAST NAME */}
          <div className="col-12">
            <p>
              {firstName}&nbsp;{lastName}&nbsp;
              <FlatButton
                className="mx-3"
                onClick={() => setEditingName(!editingName)}
              >
                EDIT
              </FlatButton>
            </p>
            <div hidden={!editingName}>
              <input type="text" value={firstNameInputValue} onChange={event => setFirstNameInputValue(event.target.value)} />
              <input type="text" value={lastNameInputValue} onChange={event => setLastNameInputValue(event.target.value)} />
              <RaisedButton
                onClick={() =>
                  updatePersonalDetails({
                    firstName: firstNameInputValue,
                    lastName: lastNameInputValue
                  })
                }
              >
                SAVE
              </RaisedButton>
            </div>
          </div>

          {/* EMAIL */}
          <div className="col-12">
            <p>
              {email}&nbsp;
              <FlatButton
                className="mx-3"
                onClick={() => setEditingEmail(!editingEmail)}
              >
                EDIT
              </FlatButton>
            </p>
            <div hidden={!editingEmail}>
              <input
                type="email"
                value={emailInputValue}
                onChange={event => setEmailInputValue(event.target.value)}
              />
              <RaisedButton
                onClick={() =>
                  updatePersonalDetails({ email: emailInputValue })
                }
              >
                SAVE
              </RaisedButton>
            </div>
          </div>
        </Row>

        <h4>MY ADDRESSES</h4>
        <hr />
        <Row>
          {addresses &&
            addresses.length > 0 &&
            addresses.map((address, id) => (
              <AddressBox
                size="col-12 col-md-3"
                key={address && address.id}
                {...address}
              />
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
