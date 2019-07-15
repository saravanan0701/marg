import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import logo from './../../images/logo.svg'
import { FlatButton } from './../commons/';
import { Container, Row, Col } from 'reactstrap';


const MobileHeaderContainer = styled.div`

  @media (min-width: 992px) { display: none; }

  .container { max-width: unset; }

  height: 85px;
  display: flex;
  align-items: center;

  img { width: 83px; }

  button.hamburger {
    outline: none;
    cursor: pointer;
    float: right;
    padding-right: 0px;

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

  handleHamburgerClick = () => this.setState({ sideMenuOpen: !this.state.sideMenuOpen });

  render() {
    return (

      <MobileHeaderContainer>
        <Container>
          <Row>
            <Col lg="12 d-flex justify-content-between align-items-center">
              <img className="img-fluid" src={logo} />
              <div className='d-flex align-items-center'>
                <FlatButton className="mr-4 d-inline-block" colorType="primary">
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
      </MobileHeaderContainer>
    )
  }
}

export default withRouter(MobileHeader);