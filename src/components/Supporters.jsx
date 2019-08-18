import React from 'react';
import styled from 'styled-components';

import { RaisedButton, FlatButton } from './commons/';
import { Link } from 'react-router-dom';

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
    {/* <SupporterBlock name="Patrons">
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
    </MiscBlock> */}

    <div className="container">
      <div className="row my-5">
        <div className="col-12 text-center">
          <h3>2019-2020</h3>
          <p>Good Earth India</p> 
          <p>John Eskenazi</p>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-12 text-center">
          <h3>2018-2019</h3>
          <p>Bahram Vakil (Trustee, Marg)</p>
          <p>BNP Paribas</p>
          <p>Eddie Dinshaw Foundation</p>
          <p>GMR Group</p>
          <p>Hemendra Kothari Foundation</p>
          <p>Jagdish Trivedi & Kunj TrivediJagdish Trivedi & Kunj Trivedi</p>
          <p>Jai & Sugandha Hiremath, Hikal Ltd</p>
          <p>Murugappa Group</p>
          <p>National Centre for the Performing Arts (NCPA)</p>
          <p>Pirojsha Godrej Foundation</p>
          <p>Shamina Talyarkhan</p>
          <p>Shapoorji Pallonji and Company Pvt Ltd</p>
          <p>Tata Trusts</p>
          <p>The Corbett Foundation</p>
          <p>The Duleep Matthai Nature Conservation Trust</p>
          <p>The Himalaya Drug Company</p>
          <p>The Narotam Sekhsaria Foundation</p>
          <p>TVS Motor Company Limited</p>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-12 text-center">
          <h3>2017-2018</h3>
          <p>Ahujasons</p> 
          <p>BNP Paribas</p>
          <p>Jai & Suganda Hiremath, Hikal Ltd</p>
          <p>JSW Foundation</p>
          <p>Pundole's</p>
        </div>
      </div>

      <div className="row my-5">
        <div className="col-12 text-center">
          <h3>2016-2017</h3>
          <p>Arumugam Suppiah</p>
          <p>Fabindia Overseas Pvt Ltd</p>
          <p>L'Affaire Designs (P) Ltd.</p>
          <p>Raza Foundation</p>
          <p>Shamina Talyarkhan</p>
          <p>Tata Trusts</p> 
          <p>YES BANK</p>
        </div>
      </div>
    </div>

  </Wrapper>
)










