import React, { Component } from 'react'

import UserMenu from './UserMenu'
import styled from 'styled-components';
import logo from './../../images/logo.png'
import headerImg from './../../images/header-left.jpg'

const HeaderContainer = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;

  & > .left {
    display: flex;
    flex-direction: row;
    align-content: center;
    padding: 20px;

    & > img {
      height: 100%;
    }
  }

  & > .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > img {
      height: 100%;
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
`

export const Header = () => (
  <HeaderContainer>
    <div className="left">
      <img src={headerImg} />
    </div>
    <div className="center">
      <img src={logo} />
      <div>Since 1946</div>
    </div>
    <UserMenu />
  </HeaderContainer>
);
