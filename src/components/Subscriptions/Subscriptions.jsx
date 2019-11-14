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
      description
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

  & > .heading {
    font-family: ${props => props.theme['$font-secondary-medium']};
    font-size: ${props => props.theme['$font-size-sm']};
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      font-size: ${props => props.theme['$font-size-lg']};
    }
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 1px;
    line-height: 42px;
    text-align: center;
    margin-bottom: 30px !important;
  }
`;


export const Subscriptions = ({
  subscriptions: boughtSubscriptions,
}) => {
  
  return (
    <Wrapper className="container">
      <div className="heading">Subscribe to Marg</div>
      <div className="row justify-content-center">
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