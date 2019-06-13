import React from 'react';
import styled from 'styled-components';

import { RaisedButton, FlatButton } from './commons/';
import { Link } from 'react-router-dom';
import advertise1 from './../images/advertise1.png';
import advertise2 from './../images/advertise2.png';

const Wrapper = styled.div`
    padding: 50px 150px 100px;
`

const SupporterWrapper = styled.div`

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

    & > div.supporters {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      justify-content: space-around;

      & > div {
        width: 30%;
        height: 60px;
        background-color: #d8d8d8;
        margin-bottom: 3%;
      }
    }
  }
`;

const SupporterBlock = ({name}) => (
  <SupporterWrapper>
    <div>
      <div className="name">{name}</div>
      <div className="supporters">
        {
          [1,2,3,4,5,6].map(() => (<div></div>))
        }
      </div>
    </div>
  </SupporterWrapper>
);

const SUPPORTER_ARR = [];
for(let i=0; i<32; i++) {
  SUPPORTER_ARR.push(i);
}

const MiscWrapper = styled.div`
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
      justify-content: center;
      flex-wrap: wrap;

      & > div {
        width: 25%;
        text-align: center;
      }                                                                                                                                                                                                                                               
    }
  }
`

const MiscBlock = ({name}) => (
  <MiscWrapper>
    <div>
      <div className="name">{name}</div>
      <div className="content">
        {
          SUPPORTER_ARR.map(() => (<div>First Last Name</div>))
        }
      </div>
    </div>
  </MiscWrapper>
);

export const Supporters = props => (
  <Wrapper>
    <SupporterBlock name="Patrons">
    </SupporterBlock>
    <SupporterBlock name="Institutional Sponsors">
    </SupporterBlock>
    <SupporterBlock name="Corporate Sponsors">
    </SupporterBlock>
    <SupporterBlock name="Co-Publishers">
    </SupporterBlock>
    <SupporterBlock name="Venue Partners">
    </SupporterBlock>
    <MiscBlock name="Individual Partners">
    </MiscBlock>
  </Wrapper>
)