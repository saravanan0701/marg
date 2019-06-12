import React from 'react';
import styled from 'styled-components';

import { RaisedButton, FlatButton } from './commons/';
import { Link } from 'react-router-dom';
import advertise1 from './../images/advertise1.png';
import advertise2 from './../images/advertise2.png';

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
`;

const AdvertiseBlock = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 200px;
  margin-bottom: 100px;

  & > div.description {
    display: flex;
    flex-direction: column;
    width: 60%;

    & > div.name {
      font-family: "Cormorant Garamond Medium";
      font-size: ${props => props.theme['$font-size-lg']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 1px;
      line-height: 57px;
    }

    & > div.meta {
      font-size: ${props => props.theme['$font-size-xxs']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 0.59px;
      line-height: 23px;

      & > div.rates {
        margin-top: 50px;
        & > div.header {
          font-size: ${props => props.theme['$font-size-xxs']};
          font-weight: ${props => props.theme['$weight-bold']};
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        & > div.footer {
          padding-top: 20px;
        }
      }
    }
  }

  & > div.img-container {
    width: 25%;
    margin-left: 5%;

    & > img {
      width: 100%;
    }
  }
`

export const Advertise = props => (
  <Wrapper>
    <div className="header">
      <div className="name">Advertise in Marg</div>
      <FlatButton>CONTACT US FOR ADS</FlatButton>
    </div>
    <AdvertiseBlock>
      <div className="description">
        <div className="name">Thematic Ads</div>
        <div className="meta">
          A unique feature of the magazine, thematic advertisements appear in the opening pages of each issue. In this section, we feature the advertisers' logos along with a set of specially curated, visually rich images that pertain to the focus of the issue. If you choose to advertise here, your company branding will feature prominently on a single page, placed beneath one of the images from the portfolio. Advertisers in this section join a list of eminent companies who support the arts.
        </div>
      </div>
      <div className="img-container">
        <img src={advertise1} />
      </div>
    </AdvertiseBlock>
    <AdvertiseBlock>
      <div className="description">
        <div className="name">Commercial Ads</div>
        <div className="meta">
          <div>
            A unique feature of the magazine, thematic advertisements appear in the opening pages of each issue. In this section, we feature the advertisers' logos along with a set of specially curated, visually rich images that pertain to the focus of the issue. If you choose to advertise here, your company branding will feature prominently on a single page, placed beneath one of the images from the portfolio. Advertisers in this section join a list of eminent companies who support the arts.
          </div>
          <div className="rates">
            <div className="header">
              Rates
            </div>
            <div className="body">
              <div>
                Back Cover          Rs. 84,000
              </div>
              <div>
                Cover Gatefold (3 pages)    Rs. 84,000
              </div>
              <div>
                Inside Front/Back Cover   Rs. 56,000
              </div>
              <div>
                Double Spread         Rs. 52,000
              </div>
              <div>
                Full Page           Rs. 32,000
              </div>
              <div>
                Half Page           Rs. 20,000
              </div>
              <div>
                (GST as applicable)
              </div>
            </div>
            <div className="footer">
              <FlatButton>DOWNLOAD DETAILS (PDF)</FlatButton>
            </div>
          </div>
        </div>
      </div>
      <div className="img-container">
        <img src={advertise2} />
      </div>
    </AdvertiseBlock>
  </Wrapper>
)