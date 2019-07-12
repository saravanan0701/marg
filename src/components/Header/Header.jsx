import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import FontAwesome from 'react-fontawesome';
import UserMenu from './UserMenu'
import styled from 'styled-components';
import logo from './../../images/logo.svg'
import headerImg from './../../images/header-left.jpg'
import { FlatButton, Menu } from './../commons/';
import { Container, Row, Col } from 'reactstrap';

const HeaderContainer = styled.div`

  display: flex;
  flex-direction: column;

  .logo-text {
    color: #37312f;
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 3.6px;
    text-transform: uppercase;
    margin-top: 0.5rem;
  }

  .color-black {
    color: black;
  }

  .menu {
    & > * {
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

      & > * {
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
        color: ${props => props.theme[props.type ? `${props.type}Color` : "primaryColor"]};
      }

    }
  }
`

const Header = ({
  history: {
    location: {
      pathname
    }
  },
  cartQuantity,
}) => (
    <HeaderContainer>

      <Container className="py-4">
        <Row>
          <Col lg="4" className="d-flex align-items-center">
            <FlatButton>Subscribe to Marg</FlatButton>
          </Col>
          <Col lg="4" className="d-flex align-items-center justify-content-center flex-column">
            <img className="img-fluid" src={logo} />
            <div className="logo-text">Since 1946</div>
          </Col>
          <Col lg="4" className="d-flex align-items-center justify-content-end">
            <UserMenu />
            <FlatButton className="ml-4" colorType="primary">
              <span className="color-black">Cart—</span>{cartQuantity}
            </FlatButton>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col className="menu">
            <Link className={pathname.match('categories') ? 'active' : ''} to="/categories">Publications</Link>
          </Col>
        </Row>
      </Container>

      <div className="secondary">
        <div className="menu">
          <Link className={pathname.match('categories') ? 'active' : ''} to="/categories">Publications</Link>
          <Menu label="About Marg">
            <Link to="/aboutus">About Marg</Link>
            <Link to="/collaborate">Historical Timeline</Link>
            <Link to="/team">Marg team</Link>
            <Link to="/supporters">SUPPORTERS/SPONSORS</Link>
            <Link to="/trustees">TRUSTEES/ADVISORY</Link>
          </Menu>
          <Link className={pathname.match('blog') ? 'active' : ''} to="/categories">Blog</Link>
          <Link className={pathname.match('advertise') ? 'active' : ''} to="/advertise">Advertise</Link>
          <Link className={pathname.match('donate') ? 'active' : ''} to="/donate">Donate</Link>
          <Link className={pathname.match('contactus') ? 'active' : ''} to="/contactus">Contact</Link>
          <Menu label="More">
            <Link to="/categories">Marg Events</Link>
            <Link to="/collaborate">Collaborate</Link>
            <Link to="/collaborate">Submit Proposals</Link>
            <Link to="/collaborate">Film Archive</Link>
          </Menu>
        </div>
        <div className="search">
          <input type="text" placeholder="Search" />
          <FontAwesome name='search' />
        </div>
      </div>
    </HeaderContainer >
  );

export default withRouter(Header);