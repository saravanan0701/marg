import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import UserMenu from './UserMenu'
import styled from 'styled-components';
import logo from './../../images/logo.svg'
import { FlatButton, Menu } from './../commons/';
import { Container, Row, Col } from 'reactstrap';
import SearchBox from './../SearchBox';
import emblem from '../../images/emblem.png'
import FontAwesome from 'react-fontawesome';


const HeaderContainer = styled.div`

  display: none;
  
  @media (min-width: ${props => props.theme['mobileBreakpoint']}) { display: block; }
  
  /* flex-direction: column; */

  #headerLogoLink {
    cursor: pointer;
    max-width: 160px;
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
      font-size: 14px;
      font-weight: ${props => props.theme['$weight-bold']};
      letter-spacing: 3px;
      text-transform: uppercase;
      cursor: pointer;
      margin-right: 45px;

      &.active {
        border-bottom: 1px solid ${props => props.theme['primaryColor']};
      }
    }
  }

  #leftCol {
    background: linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${emblem});
    background-repeat: no-repeat;
    background-position: center;

    &::after {
      content: "";
      background: url(image.jpg);
      opacity: 0.5;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      z-index: -1; 
    }
  }

  #leftColText {
    color: #000000;
    font-family: "Cormorant Garamond";
    font-size: 21px;
    font-weight: 600;
    letter-spacing: 0.5px;
    line-height: 40px;
  }

  #leftColDate {
    color: #000000;
    font-family: Lato;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 1.58px;
    text-transform: uppercase;
  }

  #rightCol {
    * {
      font-size: 14px;
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
      <Row style={{minHeight: 110}}>
        <Col lg="5" className="d-flex justify-content-center flex-column align-items-start">
          <div id="leftCol" style={{minHeight: "100%"}} className="text-center d-flex justify-content-center flex-column">
            <div id="leftColText">A Pathmaking Tradition</div>
            <div id="leftColDate">Since 1946</div>
            <img src="../../images/emblem.png" alt=""/>
          </div>
        </Col>
        <Col lg="2" className="d-flex align-items-center justify-content-center flex-column">
          <Link id="headerLogoLink" to="/"><img className="img-fluid" src={logo} /></Link>
        </Col>
        <Col id="rightCol" lg="5" className="d-flex align-items-center justify-content-end">
          {/* <FlatButton className="mr-4">Subscribe to Marg</FlatButton> */}
          <UserMenu />
          <FlatButton onClick={(e) => cartQuantity > 0 && push('/checkout')} className="ml-4" colorType="primary">
            <span className="color-black">Cart—</span>{cartQuantity}
          </FlatButton>
        </Col>
      </Row>
    </Container>

    <div className="full-width px-4 py-3" style={{backgroundColor: '#fcf8d1'}}>
    <Container>
      <Row className="d-flex justify-content-between">
        <div className="menu d-flex align-items-center flex-wrap px-0">
          <Link className={pathname.match('categories') ? 'active' : ''} to="/categories">Publications</Link>
          <Link className={pathname.match('blog') ? 'active' : ''} to="/categories">Blog</Link>
          <Link className={pathname.match('advertise') ? 'active' : ''} to="/advertise">Advertise</Link>
          <Link className={pathname.match('donate') ? 'active' : ''} to="/donate">Donate</Link>
          <Menu label="About Marg">
            <Link to="/aboutus">About Marg</Link>
            {/* <Link to="/collaborate">Historical Timeline</Link> */}
            <Link to="/team">Marg team</Link>
            <Link to="/supporters">SUPPORTERS/SPONSORS</Link>
            <Link to="/trustees">TRUSTEES/ADVISORY</Link>
          </Menu>
          <Link className={pathname.match('contactus') ? 'active' : ''} to="/contactus">Contact</Link>
          <Menu label="More">
            <Link>Marg Events</Link>
            <Link to="/collaborate">Collaborate</Link>
            <Link>Submit Proposals</Link>
            <Link>Film Archive</Link>
          </Menu>
        </div>
        <div className="menu mr-0">
          <Link className="m-0" to="/search">SEARCH<FontAwesome id="searchIcon" name='search' className='color-red ml-2' /></Link>
        </div>
        {/* <SearchBox /> */}
      </Row>
    </Container>
    </div>



  </HeaderContainer >
);

export default withRouter(Header);