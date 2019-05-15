import React, { Component } from 'react'

import UserMenu from './UserMenu'
import styled from 'styled-components';
import logo from './../../images/logo.png'
import headerImg from './../../images/header-left.jpg'
import { FlatButton } from './../commons/FlatButton';

const HeaderContainer = styled.div`

  & > .primary {

    margin: 0px 20px;
    padding-bottom: 20px;
    box-sizing: content-box;
    width: fill-available;
    height: 20vh;
    display: flex;
    flex-direction: row;
    align-content: center;
    border-bottom: 1px solid #cccccc;

    & > .left {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: start;
      padding: 20px 0px;
      width: 35%;

      & > .img-container {
        height: 100%;
        margin-right: 10px;
        width: fit-content;
        & > img {
          height: 100%;
        }
      }
    }

    & > .center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 30%;

      & > img {
        height: 100%;
        transform: translateY(-10px);
      }

      & > div {
        color: #37312f;
        font-family: Lato;
        font-size: 15px;
        font-weight: 400;
        letter-spacing: 3.6px;
        text-transform: uppercase;
      }
    }

    & > .right {
      padding: 20px 0px;
      width: 35%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;

      & > div {
        margin-left: 25px;
      }
    }
  }
`

export const Header = () => (
  <HeaderContainer>
    <div className="primary">
      <div className="left">
        <div className="img-container">
        <img src={headerImg} />
        </div>
        <FlatButton>Subscribe to Marg</FlatButton>
      </div>
      <div className="center">
        <img src={logo} />
        <div>Since 1946</div>
      </div>
      <div className="right">
        <UserMenu />
        <FlatButton type="primary">
          Cart - 0
        </FlatButton>
      </div>
    </div>
  </HeaderContainer>
);
