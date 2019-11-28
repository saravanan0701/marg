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
      issueType
      pricings{
        duration
        accessToIssues
        inrPrice{
          amount
          currency
          localized
        }
        usdPrice{
          amount
          currency
          localized
        }
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
      <p className="mx-auto my-3">
        To mark Marg’s Platinum Jubilee, we have envisioned our magazine in a new light from September 2020―interdisciplinary in nature and drawing on our rich roots even as it introduces a fresh set of ideas, segments and collaborators. Through these, we will be vitally addressing the space of free and critical thinking around the arts, and culture. As we prepare ourselves for this next chapter in our 75-year-old legacy, we bring you four thematic issues for the period between September 2019 and June 2020: <b>Infrastructure as Space, Gandhi and Aesthetics, Art and Ecology</b> and <b>Art and Conflict</b>. We invite your participation and look forward to your support and subscriptions to the Magazine.
      </p>
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
                  <SubscriptionItem
                    {...subscription}
                    key={subscription.id}
                    className="col-12 col-sm-12 col-md-6 col-lg-4 subscription"
                    pricings={subscription.pricings.map((it, id) => ({ ...it, id: id, val: id, name: `${it.duration} ${it.duration > 1? 'years': 'year' }`}) )}
                  />
                ))
              }
            }
        </Query>
      </div>
    </Wrapper>
  )
} 