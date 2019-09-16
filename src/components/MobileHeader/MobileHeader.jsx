import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import logo from './../../images/Header_marg_transparent.gif'
import { FlatButton, CollapseContainer } from './../commons/';
import { Container, Row, Col, Button } from 'reactstrap';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { width } from '@material-ui/system';


const MobileHeaderContainer = styled.div`

  @media (min-width: ${props => props.theme['mobileBreakpoint']}) { display: none; }

  .container { max-width: unset; }

  height: 85px;
  display: flex;
  align-items: center;

  #mobileHeaderLogoLink {
    cursor: pointer;
  }

  img { width: 83px; }

  button.hamburger {
    outline: none;
    cursor: pointer;
    float: right;
    padding-right: 0px;
    z-index: 1301;

    &:hover {
      color: inherit;
      opacity: unset;
    }
  }
`

const SideMenuContainer = styled.div`
  a, .collapse-link {
    color: #000000;
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-bold']};
    letter-spacing: 3px;
    text-transform: uppercase;
    cursor: pointer;
    padding-bottom: 10px;
    margin-right: 30px;
    display: block;

    &:hover {
      color: ${props => props.theme['primaryHoverColor']};
    }

    &.active {
      border-bottom: 1px solid ${props => props.theme['primaryColor']};
    }
  }

  .logo-text {
    color: #37312f;
    font-size: 9px;
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 3.6px;
    text-transform: uppercase;
    margin-top: 0.5rem;
  }

`

const CollapseTriggerContainer = styled.div`
    color: pink;
`

const PUBLICATION_LINK_LIST = [
  { 
    label:'Books',
    link:'/categories'
  },
  {
    label: 'Magazines',
    link: '/categories'
  },
  {
    label: 'Articles',
    link: '/categories'
  }
]

const ABOUT_LINK_LIST = [
  { 
    label:'Our Story',
    link:''
  },
  {
    label: 'Timeline',
    link: ''
  },
  {
    label: 'Trustees',
    link: '/trustees'
  },
  {
    label: 'Team',
    link: '/team'
  },
  {
    label: 'Patrons & Partners',
    link: '/supporters'
  }
]



class MobileHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sideMenuOpen: false
    }
  }

  handleHamburgerClick = () => this.setState({ sideMenuOpen: !this.state.sideMenuOpen });

  collapseTriggerElementPublications = () => (
    <CollapseTriggerContainer>
      <p className='collapse-link mb-0'>PUBLICATIONS</p>
    </CollapseTriggerContainer>
  )

  collapseBodyPublications = () => (
    <div>
      { PUBLICATION_LINK_LIST.map(({ label, link }) => <Link onClick={this.handleHamburgerClick} to={link}>{label}</Link>) }
    </div>
  )
  
  collapseBodyAbout = () => (
    <div>
      { ABOUT_LINK_LIST.map(({ label, link }) => <Link onClick={this.handleHamburgerClick} to={link}>{label}</Link>) }
    </div>
  )

  collapseTriggerElementAbout = () => (
    <CollapseTriggerContainer>
      <p className='collapse-link mb-0'>ABOUT US</p>
    </CollapseTriggerContainer>
  )

  sideMenuList = () => (

    <Container id="sideMenuContainer" className="py-4">
      <Row>
        <Col lg="12">
          <div className="mx-auto" style={{ width: 90 }}>
            <Link onClick={this.handleHamburgerClick} id="mobileHeaderLogoLink" to="/"><img className="img-fluid" src={logo} /></Link>
            <div className="logo-text">Since 1946</div>
          </div>
        </Col>
        <Col lg="12" className="my-5">
          <CollapseContainer trigger={this.collapseTriggerElementAbout} body={this.collapseBodyAbout}/>
          <CollapseContainer trigger={this.collapseTriggerElementPublications} body={this.collapseBodyPublications} />
          <Link hidden={true} onClick={this.handleHamburgerClick} to="/categories">Blog</Link>
          <Link onClick={this.handleHamburgerClick} to="/advertise">Advertise</Link>
          {/* <Link onClick={this.handleHamburgerClick} to="/donate">Donate</Link> */}
          <Link onClick={this.handleHamburgerClick}  to="/contactus">Contact</Link>
          {/* <Link onClick={this.handleHamburgerClick}>Marg Events</Link> */}
          {/* <Link onClick={this.handleHamburgerClick}  to="/categories">Collaborate</Link> */}
          {/* <Link onClick={this.handleHamburgerClick}>Submit Proposals</Link> */}
          {/* <Link onClick={this.handleHamburgerClick}>Film Archive</Link> */}
          <Link onClick={this.handleHamburgerClick}  to="/myaccount">My Account</Link>
        </Col>
      </Row>
    </Container>
  )

  render() {
    return (
      <MobileHeaderContainer>
        <Container>
          <Row>
            <Col lg="12 d-flex justify-content-between align-items-center">
              <Link id="mobileHeaderLogoLink" to="/"><img className="img-fluid" src={logo} /></Link>
              <div className='d-flex align-items-center'>
                <FlatButton onClick={e => this.props.cartQuantity > 0 && this.props.history.push("/checkout/cart")} className="mr-4 d-inline-block" colorType="primary">
                  <span className="color-black">Cart—</span>{this.props.cartQuantity}
                </FlatButton>
                <button
                  onClick={this.handleHamburgerClick}
                  className={"hamburger hamburger--collapse " + (this.state.sideMenuOpen ? 'is-active' : '')}
                  type="button"
                >
                  <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                  </span>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
        <SwipeableDrawer
          open={this.state.sideMenuOpen}
          onClose={this.handleHamburgerClick}
          onOpen={this.handleHamburgerClick}
        >
          <SideMenuContainer>
            {this.sideMenuList()}
          </SideMenuContainer>
        </SwipeableDrawer>
      </MobileHeaderContainer>
    )
  }
}

export default withRouter(MobileHeader);