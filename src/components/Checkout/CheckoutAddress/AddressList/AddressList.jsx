import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { checkIfSameAddress } from "./../../../../utils";
import AddressBox from "../AddressBox";
import AddressEditForm from "./../AddressEditForm.jsx";
import { FlatButton } from "./../../../commons/";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Row, Col } from "reactstrap";

const ListingWrapper = styled.div`
  .section-title {
    color: #000000;
    font-family: Lato;
    font-size: 16px;
    font-weight: 900;
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .section-label {
    color: #000000;
    font-family: Lato;
    font-size: 16px;
    font-weight: 900;
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .red-circle {
    width: 40px;
    height: 40px;
    background-color: #ec1d24;
    border-radius: 100%;

    color: #f8f8f8;
    font-family: Lato;
    font-size: 16px;
    font-weight: 900;
    letter-spacing: 3px;

    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

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

const SAVE_SHIPPING_ADDRESS_TO_CHECKOUT = gql`
  mutation SaveAddress($checkoutId: ID!, $shippingAddress: AddressInput!) {
    checkoutShippingAddressUpdate(
      checkoutId: $checkoutId
      shippingAddress: $shippingAddress
    ) {
      checkout {
        shippingAddress {
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
        availableShippingMethods {
          id
          name
          priceInr {
            currency
            amount
            localized
          }
          priceUsd {
            currency
            amount
            localized
          }
        }
      }
      errors {
        field
        message
      }
    }
    checkoutBillingAddressUpdate(
      checkoutId: $checkoutId
      billingAddress: $shippingAddress
    ) {
      checkout {
        billingAddress {
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
      errors {
        field
        message
      }
    }
  }
`;

const SAVE_BILLING_ADDRESS_TO_CHECKOUT = gql`
  mutation SaveAddress($checkoutId: ID!, $billingAddress: AddressInput!) {
    checkoutBillingAddressUpdate(
      checkoutId: $checkoutId
      billingAddress: $billingAddress
    ) {
      checkout {
        billingAddress {
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
      errors {
        field
        message
      }
    }
  }
`;

const SAVE_SHIPPING_TO_CHECKOUT = gql`
  mutation SaveAddress($checkoutId: ID!, $shippingMethodId: ID!) {
    checkoutShippingMethodUpdate(
      checkoutId: $checkoutId
      shippingMethodId: $shippingMethodId
    ) {
      checkout {
        shippingMethod {
          id
          name
          priceInr {
            amount
            currency
            localized
          }
          priceUsd {
            amount
            currency
            localized
          }
        }
        totalPrice {
          net {
            amount,
            localized
          }
          gross {
            amount,
            localized
          }
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export const AddressList = ({
  checkoutId,
  userId,
  firstName,
  lastName,
  email,
  client,
  addresses,
  shippingAddress: cartShippingAddress,
  isLoading,
  addressSaved,
  addNewAddress,
  setAvailableShippingMethods,
  updateShippingAddress,
  updateShippingMethod,
  updateCartTotalPrice,
  createGuestCheckout,
  errorNotification,
  successNotification,
}) => {
  const [showAddressForm, setShowAddressForm] = useState(true);
  const [billingAddressIsSame, setBillingAddressIsSame] = useState(true);

  useEffect(() => {
    if(addressSaved) {
      setShowAddressForm(false);
      window.scrollTo(0, 0);
    }
  }, [addressSaved])

  useEffect(() => {
    if (!isLoading && addresses.length === 0) {
      setShowAddressForm(true);
    }
  }, [isLoading, addresses]);

  const saveAddressToAddressBook = (shippingAddress) => {
    const mutShippingAddress = {...shippingAddress};
    delete mutShippingAddress.id;
    delete mutShippingAddress.__typename;
    mutShippingAddress.country = mutShippingAddress.country.code? mutShippingAddress.country.code: mutShippingAddress.country;
    return client
      .mutate({
        mutation: SAVE_NEW_ADDRESS,
        variables: {
          input: mutShippingAddress
        }
      })
      .then(({ data: { customerAddressCreate: { address, errors } } }) => {
        if (errors && errors.length > 0) {
          errorNotification(
            errors.reduce((acc, {field, message}) => {
              if(field === "phone") {
                return message;
              }
              return acc;
            }, "Error saving address, please try again.")
          );
          throw errors;
        }
        successNotification("Address saved.");
        addNewAddress(address);
        return address;
      });
  }

  const saveAddress = (shippingAddress, email = null, isNew = false) => {
    if(userId) {
      return saveAddressToCart(shippingAddress, isNew);
    } else {
      return createGuestCheckout({shippingAddress, email});
    }
  };

  const saveAddressToCart = (shippingAddress, isNew) => {
    const updatableShipping = { ...shippingAddress };
    delete updatableShipping.__typename;
    if (updatableShipping.phone.length === 10) {
      updatableShipping.phone = `+91{updatableShipping.phone}`;
    }
    updatableShipping.country = updatableShipping.country.code? updatableShipping.country.code: updatableShipping.country;
    delete updatableShipping.id;
    return client
      .mutate({
        mutation: SAVE_SHIPPING_ADDRESS_TO_CHECKOUT,
        variables: {
          checkoutId,
          shippingAddress: updatableShipping
        }
      })
      .then(
        ({
          data: {
            checkoutShippingAddressUpdate: {
              checkout: shCheckout,
              errors: checkoutShippingAddressErrors
            } = {},
            checkoutBillingAddressUpdate: {
              checkout: biCheckout,
              errors: checkoutBillingAddressErrors
            } = {}
          }
        }={}) => {
          const {
            shippingAddress: updatedShippingAddress,
            availableShippingMethods
          } = shCheckout || {};
          const { billingAddress } = biCheckout || {};

          if (
            (checkoutShippingAddressErrors &&
              checkoutShippingAddressErrors.length > 0) ||
            (checkoutBillingAddressErrors &&
              checkoutBillingAddressErrors.length > 0)
          ) {
            //TODO: show errors.
            showAddressErrorToasts(checkoutShippingAddressErrors);
            throw checkoutShippingAddressErrors;
          }
          if(isNew) {
            saveAddressToAddressBook(updatedShippingAddress);
          }
          successNotification("Selected address.")
          window.scrollTo(0,0);
          updateShippingAddress(updatedShippingAddress);
          if (availableShippingMethods.length > 0) {
            persistShippingMethod(availableShippingMethods[0]);
          }
          //TODO: Optional update billing address.
          return true;
        }
      );
  };

  const showAddressErrorToasts = (errors) => errors.map((error) => {
    const { field } = error;
    if (field === "phone") {
      errorNotification("Phone number is invalid");
    } else if (field === "postalCode") {
      errorNotification("Postal code is invalid for selected country/state");
    }
    return error;
  })

  const updateBillingAddressToCart = billingAddress => {
    const updatableBilling = { ...billingAddress };
    delete updatableBilling.__typename;
    if (updatableBilling.phone.length === 10) {
      updatableBilling.phone = `+91{updatableBilling.phone}`;
    }
    delete updatableBilling.id;
    return client
      .mutate({
        mutation: SAVE_BILLING_ADDRESS_TO_CHECKOUT,
        variables: {
          checkoutId,
          billingAddress: updatableBilling
        }
      })
      .then(
        ({
          data: {
            checkoutBillingAddressUpdate: {
              checkout: biCheckout,
              errors: checkoutBillingAddressErrors
            } = {}
          } = {}
        }) => {

          const { billingAddress } = biCheckout || {};
          
          if (
            checkoutBillingAddressErrors &&
            checkoutBillingAddressErrors.length > 0
          ) {
            showAddressErrorToasts(checkoutBillingAddressErrors);
            throw checkoutBillingAddressErrors;
          }
          successNotification("Saved billing address")
          window.scrollTo(0,0);
          // updateShippingAddress(updatedShippingAddress);
          // setAvailableShippingMethods(availableShippingMethods);
          // persistShippingMethod(availableShippingMethods[0]);
          //TODO: Optional update billing address.
          return true;
        }
      );
  };

  const persistShippingMethod = shippingMethod => {
    return client
      .mutate({
        mutation: SAVE_SHIPPING_TO_CHECKOUT,
        variables: {
          checkoutId,
          shippingMethodId: shippingMethod.id
        }
      })
      .then(
        ({
          data: {
            checkoutShippingMethodUpdate: {
              checkout: { shippingMethod: updatedShippingMethod, totalPrice },
              errors: checkoutShippingMethodErrors
            }
          }
        }) => {
          if (checkoutShippingMethodErrors.length > 0) {
            return;
          }
          updateShippingMethod(updatedShippingMethod);
          updateCartTotalPrice(totalPrice);
        }
      );
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ListingWrapper>
      <Row>
        <Col xs="12">
          <div className="red-circle">1</div>
          <span className="section-title mx-3">SHIPPING ADDRESS</span>
          <hr />
        </Col>
      </Row>
      <Row>
        {addresses &&
          addresses.length > 0 &&
          addresses.map((address, id) => (
            <AddressBox
              size="col-12 col-md-3"
              key={address && address.id}
              onClick={() => saveAddressToCart(address)}
              selected={(() => {
                return (
                  cartShippingAddress &&
                  checkIfSameAddress(address, cartShippingAddress)
                );
              })()}
              {...address}
            />
          ))}
      </Row>

      <Row>
        <Col xs="12">
          {showAddressForm && (
            <AddressEditForm
              firstName={firstName}
              lastName={lastName}
              email={email}
              saveLabel = {userId? "SAVE ADDRESS": "CONFIRM ADDRESS"}
              showCancel={userId? true: false}
              saveAddress={(address, email) => saveAddress(address, email, true)}
              toggleAddressForm={() => setShowAddressForm(!showAddressForm)}
            />
          )}
        </Col>
      </Row>

      <Row className="my-5">
        <Col xs="12">
          <div className="red-circle">2</div>
          <span className="section-title mx-3">BILLING ADDRESS</span>
          <hr />
        </Col>
        <Col xs="12">
          <FormControlLabel
            control={
              <Checkbox
                checked={billingAddressIsSame}
                onChange={() => setBillingAddressIsSame(!billingAddressIsSame)}
                value="billingAddressIsSame"
              />
            }
            label="Billing addresss is same as shipping address"
          />
        </Col>
        <Col xs="12">
          {!billingAddressIsSame && (
            <AddressEditForm
              firstName={firstName}
              lastName={lastName}
              email={email}
              saveAddress={values => updateBillingAddressToCart(values)}
              toggleAddressForm={() =>
                setBillingAddressIsSame(!billingAddressIsSame)
              }
            />
          )}
        </Col>
      </Row>
    </ListingWrapper>
  );
};
