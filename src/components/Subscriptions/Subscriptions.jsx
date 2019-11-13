import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";
import logo from "./../../images/logo.png";
import SubscriptionItem from "./SubscriptionItem"

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
`;



export const Subscriptions = ({
  subscriptions: boughtSubscriptions,
}) => {
  
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
                return subscriptions.map((subscription) => (
                  <SubscriptionItem {...subscription} key={subscription.id} className="col-12 col-sm-6 col-md-4 subscription" />
                ))
              }
            }
        </Query>
      </div>
    </Wrapper>
  )
} 