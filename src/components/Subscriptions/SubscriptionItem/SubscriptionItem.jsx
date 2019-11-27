import React, { useState, useEffect, useReducer } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import logo from "./../../../images/logo.png";
import { DropDown, RaisedButton } from "./../../commons";

const Wrapper = styled.div`
  padding: 15px;
  cursor: pointer;

  & > .header {
    color: #000000;
    font-family: ${props => props.theme['$font-primary-medium']};
    font-size: 18px;
    font-weight: ${props => props.theme['$weight-bold']};
    letter-spacing: 0.66px;
    line-height: 23px;
    text-align: center;
    padding-bottom: 14px;
    border-bottom: ${props => props.theme.primaryColor} 2px solid;
  }

  & > .body {
    padding: 35px 15px;
    background-color: #f8f8f8;

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
  ) {
    buySubscription(
      input:{
        subscriptionId: $subscriptionId,
        margSubscriptionId: $margSubscriptionId,
        paymentToken: $paymentToken,
        currency: $currency,
        totalPaid: $totalPaid
        duration: $duration
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
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRICE':
      return{
        ...action.payload,
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
  // User details end
  history: { push },
  location,
  reloadAuthenticatedUser,
  client,
  successNotification,
  errorNotification,
  className,
}) => {

  const [ priceState, dispatch ] = useReducer(reducer, INITIAL_STATE);

  const setDuration = (id) => {
    if(pricings.length == 0){
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
        client.mutate({
          mutation: SAVE_SUBSCRIPTION,
          variables: {
            duration: priceState.duration,
            subscriptionId: id,
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
    RAZORPAY_OPTIONS.currency = priceState.currency;
    RAZORPAY_OPTIONS.amount = priceState.amount * 100;
    const razpay = new window.Razorpay(RAZORPAY_OPTIONS);
    razpay.open();
  }

  const checkIfSubscriptionBought = (id) => subscriptions.find(({subscription: {id: sId}}) => sId === id)


  return (
    <Wrapper className={className}>
      <div className="header">{name}</div>
      <div className="body">
        <div className="desc">
          {ReactHtmlParser(description)}
          {issueType !== "ALL_ISSUES"? `- ${priceState.accessToIssues} issues in a year`:""}
        </div>
        <div className="price">
          {
            priceState.localized
          }
          &nbsp;
          {
            checkIfSubscriptionBought(id) && "Subscribed"
          }
        </div>
        <div className="container footer">
          <div className="row">
            <DropDown
              key="year-selector"
              className="col-4 dropdown"
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
              className="col-8"
              onClick={(e) => subscriptionClicked()}
              >
              Subscribe
            </RaisedButton>
          </div>
        </div>
      </div>
    </Wrapper>
 )
} 