import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";
import logo from "./../../../images/logo.png";

const Wrapper = styled.div`
  height: 300px;
  padding: 15px;
  cursor: pointer;
`;

const SAVE_SUBSCRIPTION = gql`
  mutation SaveSubscription(
    $subscriptionId: ID!,
    $margSubscriptionId: String!,
    $paymentToken: String!,
    $currency: String!,
    $totalPaid: Int!
  ) {
    buySubscription(
      input:{
        subscriptionId: $subscriptionId,
        margSubscriptionId: $margSubscriptionId,
        paymentToken: $paymentToken,
        currency: $currency,
        totalPaid: $totalPaid
      }
    ) {
      errors{
        message
      }
    }
  }
`;

export const SubscriptionItem = ({
  id,
  name,
  inrPrice: { amount: inrAmount, localized: inrLocalized },
  usdPrice: { amount: usdAmount, localized: usdLocalized },
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
}) => {
  
  const RAZORPAY_OPTIONS = {
    key: `${process.env.REACT_APP_RAZORPAY_KEY}`,
    name: "Marg",
    image: logo,
    handler: function(response) {
      console.log("resp: ", response);
      if (response.razorpay_payment_id) {
        // Mutation....
        client.mutate({
          mutation: SAVE_SUBSCRIPTION,
          variables: {
            subscriptionId: id,
            margSubscriptionId: "test-321",
            paymentToken: response.razorpay_payment_id,
            currency: RAZORPAY_OPTIONS.currency,
            totalPaid: RAZORPAY_OPTIONS.amount
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

  const subscriptionClicked = (id, amount) => {
    if(!isAuthenticated) {
      return push(`/login`, {from: location})
    }
    RAZORPAY_OPTIONS.currency = currency;
    RAZORPAY_OPTIONS.amount = amount * 100;
    const razpay = new window.Razorpay(RAZORPAY_OPTIONS);
    razpay.open();
  }

  const checkIfSubscriptionBought = (id) => subscriptions.find(({subscription: {id: sId}}) => sId === id)


  return (
    <Wrapper onClick={(e) => subscriptionClicked(id, currency === "INR"? inrAmount: usdAmount)}>
      <h1>{name}</h1>
      <h3>{checkIfSubscriptionBought(id)?"Already bought":currency === "USD"? usdLocalized: inrLocalized}</h3>
    </Wrapper>
  )
} 