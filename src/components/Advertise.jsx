import React from 'react';
import styled from 'styled-components';

import {RaisedButton, FlatButton} from './commons/';
import {Link} from 'react-router-dom';
import advertise1 from './../images/advertise1.png';
import advertise2 from './../images/advertise2.png';
import brochure from './../images/marg-brochure.pdf';

const Wrapper = styled.div`

  display: flex;
  flex-direction: column;

  & > div.header {
    padding: 50px 100px 100px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > div.name {
      font-family: ${props => props.theme['$font-secondary-medium']};
      font-size: ${props => props.theme['$font-size-lg']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 1px;
      line-height: 57px;
    }
  }
  
  .contact-ads {
    color: ${props => props.theme[props.colorType ? `${props.colorType}Color` : "primaryColor"]};
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-bold']};
    letter-spacing: 3px;
    text-transform: uppercase;
    cursor: pointer;
    border-bottom: 1px solid transparent;
  }

`;

const AdvertiseBlock = styled.div`

  div.description {

    .name {
      font-family: ${props => props.theme['$font-secondary-medium']};
      font-size: ${props => props.theme['$font-size-lg']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 1px;
      line-height: 57px;
    }

    .meta {
      font-size: ${props => props.theme['$font-size-xxs']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 0.59px;
      line-height: 23px;

      .rates {
        margin-top: 50px;
        .header {
          font-size: ${props => props.theme['$font-size-xxs']};
          font-weight: ${props => props.theme['$weight-bold']};
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .body {
          ul {
            list-style: none;
            padding-left: 0;
            li {
            margin-bottom: 5px;
            }
          }
        }
        .footer {
          padding-top: 20px;
        }
      }
    }
  }

  div.img-container {
    img {
      width: 100%;
    }
  }
`

export const Advertise = props => (
    <Wrapper>
        <div className="header">
            <h1 className="heading pb-2">Advertise in Marg</h1>
            <a href="/contactus" className="contact-ads">CONTACT US FOR ADS</a>
        </div>
        <AdvertiseBlock>
            <div className="container">
                <div className="row">
                    <div className="description col-12 offset-lg-1 col-lg-5 my-3">
                        <h2 className="name">Thematic Ads</h2>
                        <p className="meta">
                            A unique feature of the magazine, thematic advertisements appear in the opening pages of
                            each
                            issue. In this section, we feature the advertisers' logos along with a set of specially
                            curated,
                            visually rich images that pertain to the focus of the issue. If you choose to advertise
                            here,
                            your company branding will feature prominently on a single page, placed beneath one of the
                            images from the portfolio. Advertisers in this section join a list of eminent companies who
                            support the arts.
                        </p>
                    </div>
                    <div className="img-container col-12 col-md-6 col-lg-3 my-3">
                        <img src={advertise1}/>
                    </div>
                </div>
            </div>
        </AdvertiseBlock>
        <AdvertiseBlock>
            <div className="container my-5">
                <div className="row">
                    <div className="description col-12 offset-lg-1 col-lg-5 my-3">
                        <h2 className="name">Commercial Ads</h2>
                        <div className="meta">
                            <p className="meta">
                                Commercial advertisements are placed in the closing section of the magazine, immediately
                                after
                                the text.
                            </p>
                            <div className="rates">
                                <h4 className="header">
                                    Rates
                                </h4>
                                <div className="body">
                                    <ul>
                                        <li>
                                            Back Cover Rs. 84,000
                                        </li>
                                        <li>
                                            Cover Gatefold (3 pages) Rs. 84,000
                                        </li>
                                        <li>
                                            Inside Front/Back Cover Rs. 56,000
                                        </li>
                                        <li>
                                            Double Spread Rs. 52,000
                                        </li>
                                        <li>
                                            Full Page Rs. 32,000
                                        </li>
                                        <li>
                                            Half Page Rs. 20,000
                                        </li>
                                        <li>
                                            (GST as applicable)
                                        </li>
                                    </ul>
                                </div>
                                <div className="footer">
                                    <a href={brochure} target="_blank"><FlatButton>DOWNLOAD DETAILS (PDF)</FlatButton></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="img-container col-12 col-md-6 col-lg-3 my-3">
                        <img src={advertise2}/>
                    </div>
                </div>
            </div>
        </AdvertiseBlock>
    </Wrapper>
)