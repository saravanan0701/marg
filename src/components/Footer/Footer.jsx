import React, { Component } from 'react'

import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import logo from './../../images/logo.png'
import headerImg from './../../images/header-left.jpg'
import { FlatButton, RaisedButton } from './../commons/';

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > .primary {
    padding-top: 20px;
    height: 25vh;
    background-color: #cccccc;
    display: flex;
    flex-direction: row;
    justify-content: center;

    & > .img-container {
      height: 100%;
      width: 50%;
      max-width: 50%;
      margin-right: 10px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      & > img {
        height: 100%;
        margin-right: 15%;
      }
    }

    & > .text-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 50%;
      max-width: 50%;

      & > .text {
        width: 50%;
      }
    }
  }

  & > .secondary {
    padding-top: 20px;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: row;
    padding: 60px 40px 40px;

    & > div {
      width: 50%;
    }

    & > .subscribe {
      display: flex;
      flex-direction: column;
      width: 50%;

      & > .heading {
        color: #000000;
        font-family: "Cormorant Garamond Medium";
        font-size: ${props => props.theme['$font-size-lg']};
        font-weight: ${props => props.theme['$weight-regular']};
        letter-spacing: 1px;
        line-height: 57px;
      }

      & > .form {
        display: flex;
        flex-direction: row;

        & > input {
          border: 1px solid #cccccc;
          background-color: #f8f8f8;
          padding: 10px;
          margin-right: 10px;

          &::placeholder {
            color: ${props => props.theme[props.type? `${props.type}Color`: "primaryColor"]};
            font-size: ${props => props.theme['$font-size-xxs']};
            font-weight: ${props => props.theme['$weight-bold']};
            letter-spacing: 3px;
            text-transform: uppercase;
          }
        }
      }
    }

    & > .links {
      display: flex;
      flex-direction: column;
      width: 50%;

      & > .hypes {
        display: flex;
        flex-direction: row;
        width: 100%;
        & > div {
          width: 50%;
          & > div {
            width: fit-content;
            margin-bottom: 25px
          }
        }
      }

      & > .copyright {
        color: #000000;
        font-size: 14px;
        font-weight: ${props => props.theme['$weight-regular']};
        letter-spacing: 0.52px;
        line-height: 21px;
      }
    }
  }
`

export const Footer = () => (
  <FooterContainer>
    <div className="primary">
      <div className="img-container">
        <img src={headerImg} />
      </div>
      <div className="text-container">
        <FlatButton>Subscribe to Marg</FlatButton>
        <div className="text">Some footer dummy content for the footer which is a bit
          long but not long enough to irritate the user</div>
      </div>
    </div>
    <div className="secondary">
      <div className="subscribe">
        <div className="heading">Sign up for Newsletters:</div>
        <div className="form">
          <input type="text" placeholder="Your email"/>
          <RaisedButton colorType="primary">Sign up</RaisedButton>
        </div>
      </div>
      <div className="links">
        <div className="hypes">
          <div>
            <FlatButton colorType="secondary">Home</FlatButton>
            <FlatButton colorType="secondary">Publications</FlatButton>
            <FlatButton colorType="secondary">About Marg</FlatButton>
            <FlatButton colorType="secondary">Blog</FlatButton>
          </div>
          <div>
            <FlatButton colorType="secondary">Advertise</FlatButton>
            <FlatButton colorType="secondary">Donate</FlatButton>
            <FlatButton colorType="secondary">Contact</FlatButton>
            <FlatButton colorType="secondary">More</FlatButton>
          </div>
        </div>
        <div className="copyright">
          Terms & Conditions | Privacy Policy | © 2019 The Marg Foundation
        </div>
      </div>
    </div>
  </FooterContainer>
);
