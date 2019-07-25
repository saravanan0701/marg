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

  display: none;
  
  @media (min-width: ${props => props.theme['mobileBreakpoint']}) { display: flex; }
  
  flex-direction: column;

  #headerLogoLink {
    cursor: pointer;
  }

  .logo-text {
    color: #37312f;
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 3.6px;
    text-transform: uppercase;
    margin-top: 0.5rem;
  }

  hr {
    border-top: 1px solid #cccccc;
  }

  .menu {
    & > * {
      color: #000000;
      font-size: ${props => props.theme['$font-size-xxs']};
      font-weight: ${props => props.theme['$weight-bold']};
      letter-spacing: 3px;
      text-transform: uppercase;
      cursor: pointer;
      padding-bottom: 5px;
      margin-right: 30px;

      &.active {
        border-bottom: 1px solid ${props => props.theme['primaryColor']};
      }
    }
  }

  .search {
    position: absolute;
    right: 0;
    margin-right: 0px;

    input {
      ::-webkit-input-placeholder { 
        text-align:right;
        color: #000000;
        font-size: ${props => props.theme['$font-size-xxs']};
        font-weight: ${props => props.theme['$weight-bold']};
        letter-spacing: 3px;
        text-transform: uppercase;
      }

      input:-moz-placeholder { 
        text-align:right;
        color: #000000;
        font-size: ${props => props.theme['$font-size-xxs']};
        font-weight: ${props => props.theme['$weight-bold']};
        letter-spacing: 3px;
        text-transform: uppercase;
      }

      padding: 10px 20px;
      padding-right: 40px;

      outline: none;
      border: none;

      background-color: #f8f8f8;
    }

    #searchIcon {
      position: absolute;
      right: 5%;
    }
  }
`

const Header = ({
  history: {
    push,
    location: {
      pathname
    }
  },
  cartQuantity,
}) => (
  <HeaderContainer>

    <Container className="py-4 d-none d-lg-block px-0">
      <Row>
        <Col lg="4" className="d-flex align-items-center">
          <FlatButton>Subscribe to Marg</FlatButton>
        </Col>
        <Col lg="4" className="d-flex align-items-center justify-content-center flex-column">
          <Link id="headerLogoLink" to="/"><img className="img-fluid" src={logo} /></Link>
          <div className="logo-text">Since 1946</div>
        </Col>
        <Col lg="4" className="d-flex align-items-center justify-content-end">
          <UserMenu />
          <FlatButton onClick={(e) => push('/checkout')} className="ml-4" colorType="primary">
            <span className="color-black">Cart—</span>{cartQuantity}
          </FlatButton>
        </Col>
      </Row>
      <hr/>
    </Container>

    <Container>
      <Row>
        <Col xs="12" className="menu d-flex align-items-center flex-wrap mb-3 px-0">
          <Link className={pathname.match('categories') ? 'active' : ''} to="/categories">Publications</Link>
          <Link className={pathname.match('blog') ? 'active' : ''} to="/categories">Blog</Link>
          <Link className={pathname.match('advertise') ? 'active' : ''} to="/advertise">Advertise</Link>
          <Link className={pathname.match('donate') ? 'active' : ''} to="/donate">Donate</Link>
          <Menu label="About Marg">
            <Link to="/aboutus">About Marg</Link>
            <Link to="/collaborate">Historical Timeline</Link>
            <Link to="/team">Marg team</Link>
            <Link to="/supporters">SUPPORTERS/SPONSORS</Link>
            <Link to="/trustees">TRUSTEES/ADVISORY</Link>
          </Menu>
          <Link className={pathname.match('contactus') ? 'active' : ''} to="/contactus">Contact</Link>
          <Menu label="More">
            <Link to="/categories">Marg Events</Link>
            <Link to="/collaborate">Collaborate</Link>
            <Link to="/collaborate">Submit Proposals</Link>
            <Link to="/collaborate">Film Archive</Link>
          </Menu>
          <div className="search d-flex align-items-center">
            <input type="text" placeholder="Search" />
            <FontAwesome id="searchIcon" name='search' className='color-red' />
          </div>
        </Col>
      </Row>
    </Container>

  </HeaderContainer >
);

export default withRouter(Header);