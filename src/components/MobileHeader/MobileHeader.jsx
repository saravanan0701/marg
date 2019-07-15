import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import logo from './../../images/logo.svg'
import headerImg from './../../images/header-left.jpg'
import { FlatButton, Menu } from './../commons/';
import { Container, Row, Col } from 'reactstrap';

const MobileHeaderContainer = styled.div`

  height: 85px;

  button.hamburger {
    outline: none;
    cursor: pointer;

    &:hover {
      color: inherit;
      opacity: unset;
    }
  }

`

class MobileHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sideMenuOpen: false
    }
  }

  handleHamburgerClick = () => this.setState({sideMenuOpen: !this.state.sideMenuOpen }); 

  render() {
    return (

      <MobileHeaderContainer>
        <div className="container">

          

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
      </MobileHeaderContainer>
    )
  }
}

export default withRouter(MobileHeader);