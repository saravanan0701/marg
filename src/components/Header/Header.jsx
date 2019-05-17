import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import FontAwesome from 'react-fontawesome';
import UserMenu from './UserMenu'
import styled from 'styled-components';
import logo from './../../images/logo.png'
import headerImg from './../../images/header-left.jpg'
import { FlatButton } from './../commons/';
const HeaderContainer = styled.div`

  display: flex;
  flex-direction: column;

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
        font-size: ${props => props.theme['$font-size-xxs']};
        font-weight: ${props => props.theme['$weight-regular']};
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

  & > .secondary {
    margin: 0px 20px;
    padding-bottom: 20px;
    box-sizing: content-box;
    width: fill-available;
    display: flex;
    flex-direction: row;
    align-content: center;
    padding-top: 20px;

    & > .menu {
      width: 90%;
      display: flex;
      flex-direction: row;

      & > a {
        color: #000000;
        font-size: ${props => props.theme['$font-size-xxs']};
        font-weight: ${props => props.theme['$weight-medium']};
        letter-spacing: 3px;
        text-transform: uppercase;
        cursor: pointer;
        margin-right: 30px;
        padding-bottom: 5px;

        &.active {
          border-bottom: 1px solid ${props => props.theme['primaryColor']};
        }
      }
    }

    & > .search {
      width: 10%;
      position: relative;

      & > input {
        width: 100%;
        border: none;
        cursor: pointer;

        &::placeholder {
          color: #000000;
          font-size: ${props => props.theme['$font-size-xxs']};
          font-weight: ${props => props.theme['$weight-medium']};
          letter-spacing: 3px;
          text-transform: uppercase;
        }
        &:focus::placeholder {
          color: grey;
        }
      }

      & > span {
        position: absolute;
        right: 10px;
        top: 5px;
        z-index: 1;
        color: ${props => props.theme[props.type? `${props.type}Color`: "primaryColor"]};
      }

    }
  }
`

const Header = ({
  history: {
    location: {
      pathname
    }
  }
}) => (
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
    <div className="secondary">
      <div className="menu">
        <Link className={pathname.match('categories')? 'active':''} to="/categories">Publications</Link>
        <Link to="/categories">About Marg</Link>
        <Link to="/categories">Blog</Link>
        <Link to="/categories">Advertise</Link>
        <Link to="/categories">Donate</Link>
        <Link to="/categories">Contact</Link>
        <Link to="/categories">More</Link>
      </div>
      <div className="search">
        <input type="text" placeholder="Search"/>
        <FontAwesome name='search' />
      </div>
    </div>
  </HeaderContainer>
);

export default withRouter(Header);