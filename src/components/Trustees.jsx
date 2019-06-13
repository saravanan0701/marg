import React from 'react';
import styled from 'styled-components';

import { RaisedButton, FlatButton } from './commons/';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    padding: 50px 150px 100px;
`

const TrusteeWrapper = styled.div`

  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > div.name {
      font-family: "Cormorant Garamond Medium";
      font-size: ${props => props.theme['$font-size-lg']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 1px;
      line-height: 57px;
      padding-bottom: 50px;
    }

    & > div.content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      justify-content: space-around;
    }
  }
`;


// & > div.content {
//       display: flex;
//       flex-direction: row;
//       flex-wrap: wrap;
//       width: 100%;
//       justify-content: space-around;

//       & > div {
//         width: 30%;
//         height: 60px;
//         background-color: #d8d8d8;
//         margin-bottom: 3%;
//       }
//     }

const TrusteeDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;

  & > div.img {
    background-color: #d8d8d8;
    height: 300px;
  }

  & > .date {
    color: #3a3a3a;
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 0.59px;
    line-height: 23px;
    text-transform: uppercase;
    margin-top: 10px;
  }

  & > .name {
    font-size: ${props => props.theme['$font-size-xs']};
    font-weight: ${props => props.theme['$weight-bold']};
    letter-spacing: 0.66px;
    line-height: 23px;
  }

  & > .designation {
    color: #3a3a3a;
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 0.59px;
    line-height: 23px;
    text-transform: uppercase;
  }
`;

const TrusteeDetails = () => (
  <TrusteeDetailsWrapper>
    <div className="img">
    </div>
    <div className="date">
      2011 - CURRENT
    </div>
    <div className="name">
      First Lastname
    </div>
    <div className="designation">
      Designation, title
    </div>
  </TrusteeDetailsWrapper>
);

const Trustee = ({name}) => (
  <TrusteeWrapper>
    <div>
      <div className="name">{name}</div>
      <div className="content">
        {
          [1,2,3].map(() => (<TrusteeDetails>PPP</TrusteeDetails>))
        }
      </div>
    </div>
  </TrusteeWrapper>
)

export const Trustees = props => (
  <Wrapper>
    <Trustee name="Trustees">
    </Trustee>
    <Trustee name="Advisory Committe">
    </Trustee>
  </Wrapper>
)