import React from 'react';
import styled from 'styled-components';

import { RaisedButton, FlatButton } from './commons/';
import { Link } from 'react-router-dom';
import collaborate1 from './../images/collaborate1.png';
import collaborate2 from './../images/collaborate2.png';

const Wrapper = styled.div`

  display: flex;
  flex-direction: column;

  & > div.header {
    padding: 50px 100px 100px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > div.name {
      font-family: "Cormorant Garamond Medium";
      font-size: ${props => props.theme['$font-size-lg']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 1px;
      line-height: 57px;
    }
  }

  & > div.body {
    display: flex;
    flex-direction: row;
    padding: 0px 150px 150px;

    & > div.text {
      display: flex;
      flex-direction: column;
      width: 50%;

      & > div {
        margin-bottom: 15px;
      }
    }

    & > div.imgs {
      display: flex;
      flex-direction: column;
      padding-left: 30px;

      & > img {
        margin-bottom: 10px;
      }
    }
  }
`;

export const Collaborate = props => (
  <Wrapper>
    <div className="header">
      <div className="name">Collaborate with Marg</div>
      <FlatButton>CONTACT US FOR COLLABORATIONS</FlatButton>
    </div>
    <div className="body">
      <div className="text">
        <div>
          Marg prides itself as a source of high quality editing, design, and production values in book publication. It offers its service to clients for producing books, calendars, desk diaries and portfolios.
        </div>
        <div>
          With a team of experienced editors and designers, Marg sets itself the same high standards of excellence in its clients’ products as it does in its magazine and its books.
        </div>
        <div>
          Marg produced The Karl Khandalavala Collection in the Chhatrapati Shivaji Maharaj Vastu Sangrahalaya, Mumbai; Salim Ali’s India, Birds of Rashtrapati Bhavan, Treasures of Indian Wildlife, Loke Wan Tho’s Birds, and Living Jewels from the Indian Jungle, premium quality books for the Bombay Natural History Society; Ocean of Wisdom:  Embodiment of Compassion, on a Tibetan art collection for the Aspen Institute, Aspen, Colorado; Mint Road Milestones: RBI at 75, a celebratory book for the Reserve Bank of India; and The TIFR Art Collection, for the Tata Institute of Fundamental Research.
        </div>
        <div>
          Annual commissions include an illustrated desk diary for the Tata Group of Companies.
        </div>
      </div>
      <div className="imgs">
        <img src={collaborate1} />
        <img src={collaborate2} />
      </div>
    </div>
  </Wrapper>
)