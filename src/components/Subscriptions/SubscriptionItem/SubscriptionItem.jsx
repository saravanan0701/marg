import React, { useState, useEffect, useReducer } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import logo from "./../../../images/logo.png";
import { DropDown, RaisedButton } from "./../../commons";
import { AddressList } from "./../AddressList.jsx";

const Wrapper = styled.div`
  padding: 15px;
  cursor: pointer;
  min-height: 400px;

  & > .header {
    color: #000000;
    font-family: ${props => props.theme['$font-primary-medium']};
    font-size: 18px;
    font-weight: ${props => props.theme['$weight-bold']};
    letter-spacing: 0.66px;
    line-height: 23px;
    border-bottom: ${props => props.theme.primaryColor} 2px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 7px;
  }

  & > .body {
    padding: 35px 15px;
    background-color: #f8f8f8;
    height: 90%;

    & > .desc {
      color: #000000;
      font-family: ${props => props.theme['$font-primary-medium']};
      font-size: 16px;
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 0.59px;
      line-height: 23px;
    }

    & > .price {
      color: #37312f;
      padding-top: 30px;
      font-size: 18px;
      font-family: ${props => props.theme['$font-primary-medium']};
      font-weight: ${props => props.theme['$weight-bold']};
    }

    & .footer {
      margin-top: 30px;
      & .dropdown {
        padding-left: 0px !important;
        & > button {
          padding: 10px;
          & .selected-options {
            display: none;
          }
        }
      }
    }
  }

`;

const SAVE_SUBSCRIPTION = gql`
  mutation SaveSubscription(
    $subscriptionId: ID!,
    $margSubscriptionId: String!,
    $paymentToken: String!,
    $currency: String!,
    $totalPaid: Int!,
    $duration: Int!,
    $shippingAddress: AddressInput!
  ) {
    buySubscription(
      input:{
        subscriptionId: $subscriptionId,
        margSubscriptionId: $margSubscriptionId,
        paymentToken: $paymentToken,
        currency: $currency,
        totalPaid: $totalPaid,
        duration: $duration,
        address: $shippingAddress,
      }
    ) {
      errors{
        message
      }
    }
  }
`;


const INITIAL_STATE = {
  currency: null,
  amount: null,
  duration: 1,
  accessToIssues: 4,
  selectedAddress: null,
  showAddressSelection: false,
  showPaymentLink: false,
  addresses: [],//This will be set to redux's auth.addresses in the first load of the component.
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRICE':
      return{
        ...state,
        ...action.payload,
      };
    case 'SET_ADDRESS':
      return{
        ...state,
        selectedAddress: {...action.payload},
      };
    case 'SHOW_ADDRESSES':
      return {
        ...state,
        showAddressSelection: true,
      };
    case 'HIDE_ADDRESSES':
      return {
        ...state,
        showAddressSelection: false,
      };
    case 'SHOW_PAYMENT_LINK':
      return {
        ...state,
        showAddressSelection: false,
        showPaymentLink: true,
      };
    case 'HIDE_PAYMENT_LINK':
      return {
        ...state,
        showAddressSelection: false,
        showPaymentLink: false,
      };
    case 'ADD_NEW_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.concat(action.payload),
      }
    case 'ADD_USERS_ADDRESSES':
      return {
        ...state,
        addresses: [
          ...action.payload,
        ],
      }
  }
}



export const SubscriptionItem = ({
  id,
  name,
  description,
  pricings,
  issueType,
  // User details start
  email,
  firstName,
  lastName,
  currency,
  isAuthenticated,
  subscriptions,
  addresses,
  // User details end
  history: { push }={},
  location,
  reloadAuthenticatedUser,
  client,
  successNotification,
  errorNotification,
  className,
  readOnly = false,
  startDate,
  endDate,
}) => {

  const [ priceState, dispatch ] = useReducer(reducer, INITIAL_STATE);

  const setDuration = (id) => {
    if(!pricings || pricings.length == 0){
      return;
    }
    const {
      inrPrice,
      usdPrice,
      accessToIssues,
      duration,
    } = pricings[id];
    dispatch({type: "SET_PRICE", payload: { accessToIssues, duration, ...(currency === "USD"? usdPrice: inrPrice)} });
  }

  useEffect(() => (setDuration(0)), []);
  
  const RAZORPAY_OPTIONS = {
    key: `${process.env.REACT_APP_RAZORPAY_KEY}`,
    name: "Marg",
    image: logo,
    handler: function(response) {
      if (response.razorpay_payment_id) {
        const shippingAddress = { ...priceState.selectedAddress };
        delete shippingAddress.id;
        delete shippingAddress.__typename;
        shippingAddress.country = shippingAddress.country.code;
        client.mutate({
          mutation: SAVE_SUBSCRIPTION,
          variables: {
            duration: priceState.duration,
            subscriptionId: id,
            shippingAddress,
            margSubscriptionId: "test-321",
            paymentToken: response.razorpay_payment_id,
            currency: RAZORPAY_OPTIONS.currency,
            totalPaid: RAZORPAY_OPTIONS.amount,
          }
        }).then((data, errors) => {
          reloadAuthenticatedUser()
          successNotification(`Success, you are now suscribed to ${name}`);
        }).catch((err) => (errorNotification("Something went wrong during payment please try again later.")));
      }
    },
    prefill: {
      email,
      "name": `${firstName} ${lastName}`,
    },
    theme: {
      color: "#F37254"
    },
    modal: {
      ondismiss: function() {
      }
    }
  };

  const subscriptionClicked = () => {
    if(!isAuthenticated) {
      return push(`/login`, {from: location})
    }
    dispatch({type: "SHOW_ADDRESSES"});
  }

  const onPopupClosed = () => {
    if(priceState.showPaymentLink) {
      RAZORPAY_OPTIONS.currency = priceState.currency;
      RAZORPAY_OPTIONS.amount = priceState.amount * 100;
      RAZORPAY_OPTIONS.notes = {type: "Subscriptions"};
      const razpay = new window.Razorpay(RAZORPAY_OPTIONS);
      setTimeout(() => razpay.open(), 1000);
    }
  }

  useEffect(() => {
    if(addresses && addresses.length > 0) {
      dispatch({type: "ADD_USERS_ADDRESSES", payload: addresses});
    }
  }, [addresses])

  const checkIfSubscriptionBought = (id) => subscriptions.find(({subscription: {id: sId}}) => sId === id)


  return (
    <Wrapper className={className}>
      <div className="header">{name}</div>
      <div className="body d-flex flex-column justify-content-between">
        <div className="desc">
          {ReactHtmlParser(description)}
        </div>
        {
          readOnly && 
            <div className="row">
              <div className="col-6">From: {startDate}</div>
              <div className="col-6">To: {endDate}</div>
            </div>
        }
        {
          !readOnly && 
            <div className="price">
              {
                priceState.localized
              }
              &nbsp;
              {
                checkIfSubscriptionBought(id) && "Subscribed"
              }
            </div>
        }
        {
          !readOnly && 
            <div className="container footer">
              <div className="row">
                <DropDown
                  key="year-selector"
                  className="col-4 col-sm-6 col-xl-4 dropdown"
                  loadData={pricings}
                  defaultOption={pricings[0]}
                  enableSearch={false}
                  showSelectedOption={true}
                  onOptionSelect={
                    (newDuration) => setDuration(newDuration.id)
                  }
                  >
                </DropDown>
                <RaisedButton
                  className="col-8 col-sm-6 col-xl-8"
                  onClick={(e) => subscriptionClicked()}
                  >
                  Subscribe
                </RaisedButton>
              </div>
            </div>
        }
      </div>
      <AddressList
        selectedAddress={priceState.selectedAddress}
        addresses={priceState.addresses}
        open={priceState.showAddressSelection}
        hidePopup={() => dispatch({ type: "HIDE_ADDRESSES"})}
        selectAddress={(address) => dispatch({ type: "SET_ADDRESS", payload: address })}
        showPaymentLink={() => dispatch({ type: "SHOW_PAYMENT_LINK"})} 
        addNewAddress={(address) => dispatch({ type: "ADD_NEW_ADDRESS", payload: address })}
        onClosed={() => onPopupClosed()}
      />
    </Wrapper>
 )
} 