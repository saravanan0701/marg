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
      font-family: "Cormorant Garamond Medium";
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

    div.name {
      font-family: "Cormorant Garamond Medium";
      font-size: ${props => props.theme['$font-size-lg']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 1px;
      line-height: 57px;
    }

    div.meta {
      font-size: ${props => props.theme['$font-size-xxs']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 0.59px;
      line-height: 23px;

      div.rates {
        margin-top: 50px;
        div.header {
          font-size: ${props => props.theme['$font-size-xxs']};
          font-weight: ${props => props.theme['$weight-bold']};
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        div.footer {
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
                        <div className="name">Thematic Ads</div>
                        <div className="meta">
                            A unique feature of the magazine, thematic advertisements appear in the opening pages of
                            each
                            issue. In this section, we feature the advertisers' logos along with a set of specially
                            curated,
                            visually rich images that pertain to the focus of the issue. If you choose to advertise
                            here,
                            your company branding will feature prominently on a single page, placed beneath one of the
                            images from the portfolio. Advertisers in this section join a list of eminent companies who
                            support the arts.
                        </div>
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
                        <div className="name">Commercial Ads</div>
                        <div className="meta">
                            <div>
                                Commercial advertisements are placed in the closing section of the magazine, immediately
                                after
                                the text.
                            </div>
                            <div className="rates">
                                <div className="header">
                                    Rates
                                </div>
                                <div className="body">
                                    <div>
                                        Back Cover Rs. 84,000
                                    </div>
                                    <div>
                                        Cover Gatefold (3 pages) Rs. 84,000
                                    </div>
                                    <div>
                                        Inside Front/Back Cover Rs. 56,000
                                    </div>
                                    <div>
                                        Double Spread Rs. 52,000
                                    </div>
                                    <div>
                                        Full Page Rs. 32,000
                                    </div>
                                    <div>
                                        Half Page Rs. 20,000
                                    </div>
                                    <div>
                                        (GST as applicable)
                                    </div>
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