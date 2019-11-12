import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";

const LIST_SUBSCRIPTIONS = gql`
  query ListSubscriptions {
    subscriptions{
      id
      name
      usdPrice {
        currency
        amount
        localized
      }
      inrPrice {
        currency
        amount
        localized
      }
    }
  }
`;

const Wrapper = styled.div`
  @media (min-width: ${props => props.theme["mobileBreakpoint"]}) {
    padding: 50px 100px 100px;
  }
  & .subscription {
    height: 300px;
    padding: 15px;
    cursor: pointer;
  }
`;

export const Subscriptions = ({ currency, isAuthenticated, history: { push }, location}) => {
  
  const subscriptionClicked = (id, amount) => {
    if(!isAuthenticated) {
      push(`/login`, {from: location})
    }
  }
  
  return (
    <Wrapper class="container">
      <div class="row">
        <Query
          query={LIST_SUBSCRIPTIONS}
          >
            {
              ({ loading, error, data: { subscriptions = {} } = {} }) => {
                if(loading) {
                  return <div>Loading, please wait.</div>
                }
                return subscriptions.map(({
                  id, name,
                  inrPrice: {amount: inrAmount, localized: inrLocalized },
                  usdPrice: {amount: usdAmount, localized: usdLocalized },
                }) => (
                  <div
                    key={id} onClick={(e) => subscriptionClicked(id, currency === "INR"? inrAmount: usdAmount)}
                    class="col-12 col-sm-6 col-md-4 subscription"
                    >
                    <h2>{name}</h2>
                    <h4>{currency === "INR"? inrLocalized: usdLocalized}</h4>
                  </div>
                ))
              }
            }
        </Query>
      </div>
    </Wrapper>
  )
} 