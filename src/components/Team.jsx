import React from 'react';
import styled from 'styled-components';

import { RaisedButton } from './commons/';
import { Link } from 'react-router-dom';
import anand from './../images/anand.png';
import default_profile from './../images/default_profile.jpeg';

const Wrapper = styled.div`

  display: flex;
  flex-direction: column;
  padding: 0px 150px;

  & > div.hero-content {

    & > div.header {
      font-family: "Cormorant Garamond Medium";
      font-size: ${props => props.theme['$font-size-lg']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 1px;
      line-height: 57px;
      padding: 100px 0px 60px;
      text-align: center;
    }

    & > div.content {
      display: flex;
      flex-direction: row;
      align-items: center;

      & > div.img-container {
        width: 50%;
        display: flex;
        flex-direction: row-reverse;
        padding-right: 40px;

        & > img {
          object-fit: contain;
          object-position: right;
        }
      }

      & > div.meta {
        width: 40%;
        display: flex;
        flex-direction: column;
        padding-top: 30px;

        & > div.sub-info {
          color: ${props => props.theme.secondaryColor};
          font-size: ${props => props.theme['$font-size-xxs']};
          font-weight: ${props => props.theme['$weight-regular']};
          letter-spacing: 0.59px;
          line-height: 23px;
        }

        & > div.name {
          font-size: ${props => props.theme['$font-size-xs']};
          font-weight: ${props => props.theme['$weight-bold']};
          letter-spacing: 0.66px;
          line-height: 23px;
        }

        & > div.description {
          font-size: ${props => props.theme['$font-size-xxs']};
          font-weight: ${props => props.theme['$weight-regular']};
          letter-spacing: 0.59px;
          line-height: 23px;
          padding-top: 20px;
        }
      }
    }

    & > .row-3 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-top: 90px;


      & > div {
        width: 30%;
      }
    }
  }

  & > .row-4 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 90px;
    padding-bottom: 200px;
    flex-wrap: wrap;


    & > div {
      width: 24%;
    }
  }
`;

const PersonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  & > img {
    width: 100%;
  }

  & > .sub-info {
    letter-spacing: 0.59px;
    line-height: 23px;
    text-transform: uppercase;
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
  }

  & > .name {
    font-size: ${props => props.theme['$font-size-xs']};
    font-weight: ${props => props.theme['$weight-bold']};
    letter-spacing: 0.66px;
    line-height: 23px;
  }
`;

const PersonDetails = props => (
  <PersonWrapper>
    <img src={default_profile} />
    <div className="sub-info">
      1046 - Current
    </div>
    <div className="name">
      Mulk Raj Anand
    </div>
    <div className="sub-info">
      Founder & Editor
    </div>
  </PersonWrapper>
);

export const Team = props => (
  <Wrapper>
    <div className="hero-content">
      <div className="header">
        Marg Team
      </div>
      <div className="content">
        <div className="img-container">
          <img src={anand} />
        </div>
        <div className="meta">
          <div className="sub-info">
            1046 - 1976
          </div>
          <div className="name">
            Mulk Raj Anand
          </div>
          <div className="sub-info">
            Founder & Editor
          </div>
          <div className="description">
            He was philosopher, litterateur, and social activist, was the Founding Editor of Marg. An avowed nationalist and modernist, under his leadership, for some 30 odd years, Marg began to undertake the massive task of identifying, cataloguing, and publicizing the nation’s heritage in the built, visual, and performing arts, seeking to engender public debates about museums, monuments, urban planning, art education, and questions of heritage.
          </div>
        </div>
      </div>
      <div className="row-3">
        <PersonDetails />
        <PersonDetails />
        <PersonDetails />
      </div>
    </div>
    <div className="row-4">
        <PersonDetails />
        <PersonDetails />
        <PersonDetails />
        <PersonDetails />
        <PersonDetails />
    </div>
  </Wrapper>
)