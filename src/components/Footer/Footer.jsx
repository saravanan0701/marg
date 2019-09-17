import React, { Component } from 'react'

import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import logo from './../../images/logo.png';
import headerImg from './../../images/header-left.jpg';

import { Link } from 'react-router-dom';
import { FlatButton, RaisedButton } from './../commons/';
import { Container, Row, Col } from 'reactstrap';


const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;

  .footer-link {
    font-size: $font-size-xxs;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 1.5rem;

    span { color: red; }

    a {

      color: #3a3a3a;
    }
  }



  .subscribe-heading {
    color: #000000;
    font-family: "Cormorant Garamond Medium";

    font-size: ${props => props.theme['$font-size-sm']};
    @media (min-width: 992px) { font-size: ${props => props.theme['$font-size-md']}; }
    @media (min-width: 1200px) { font-size: ${props => props.theme['$font-size-lg']}; }

    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 1px;
  }

  input.subscribe {
    border: 1px solid #cccccc;
    background-color: #f8f8f8;
    padding: 10px;
    margin-right: 10px;
    width: 50%;

    &::placeholder {
      color: ${props => props.theme[props.type ? `${props.type}Color` : "primaryColor"]};
      font-size: ${props => props.theme['$font-size-xxxs']};
      font-weight: ${props => props.theme['$weight-bold']};
      letter-spacing: 3px;
      text-transform: uppercase;
    }
  }

  #magazineSubscribe {
    background-color: #fcf8d1;
    a {
      color: ${props => props.theme["primaryColor"]};
      font-family: Lato;
      font-size: ${props => props.theme['$font-size-xxs']};
      font-weight: ${props => props.theme['$weight-bold']};
      letter-spacing: 3px;
      text-transform: uppercase;
    }
    p {
      color: black;
      font-family: Lato;
      font-size: ${props => props.theme['$font-size-xxs']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 0.59px;
      line-height: 23px;
      max-width: 350px;
    }
  }

  .legal {
    color: #000000;
    font-family: Lato;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.52px;
    line-height: 21px;
    a, a:visited {
      color:#000000;
    }
  }
`

export const Footer = () => (
  <FooterContainer>
    <div id="magazineSubscribe" className='text-center py-5 full-width'>
      <Link to="/subscribe">SUBSCRIBE TO MARG</Link>
      <p className="mx-auto my-3">Founded in 1946, Marg magazine has consistently published original research on Indian art and culture, combining scholarly analysis with high-quality, evocative images. </p>
    </div>
    <div className='py-5 full-width bg-gray'>
      <Container className="px-4 px-lg-5">
        <Row>
          <Col lg='6' className="mb-5 mb-lg-0">
            <div className="subscribe">
              <div className="subscribe-heading">Sign up to newsletters:</div>
              <div className="form my-3">
                <input type="email" placeholder="Your email" className="subscribe" />
                <RaisedButton colorType="primary">Sign up</RaisedButton>
              </div>
            </div>
          </Col>
          <Col lg='6'>
            <Row>
              <Col lg='6'>
                <FlatButton className="footer-link" colorType="secondary"><Link to="/">Home</Link></FlatButton>
                <FlatButton className='footer-link' colorType="secondary"><Link to="/categories">Publications</Link></FlatButton>
                <FlatButton className='footer-link' colorType="secondary"><Link to="/aboutus">About Marg</Link></FlatButton>
                <FlatButton hidden={true} className='footer-link' colorType="secondary">Blog</FlatButton>
              </Col>
              <Col lg='6'>
                <FlatButton className="footer-link" colorType="secondary"><Link to="/advertise">Advertise</Link></FlatButton>
                <FlatButton className="footer-link" colorType="secondary"><Link to="/donate">Donate</Link></FlatButton>
                <FlatButton className="footer-link" colorType="secondary"><Link to="/contactus">Contact</Link></FlatButton>
                <FlatButton hidden={true} className="footer-link" colorType="secondary">More</FlatButton>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="my-4">
          <Col lg="6">
            <p className="legal">The digitization of the Magazine has been supported by Tata Trusts</p>
          </Col>
          <Col lg="6">
            <span className="legal">
              <Link to="terms-and-conditions">Terms & Conditions</Link>
              &nbsp; | &nbsp;
            <Link to="terms-and-conditions">Privacy Policy</Link>
              &nbsp; | &nbsp;
            <p className="d-inline">© 2019 The Marg Foundation</p>
            </span>
            <span>
              <p className="legal">Designed and built by <a target="_blank" href="https://1stmain.co">1stMain</a></p>
            </span>
          </Col>
        </Row>
      </Container>
    </div>

  </FooterContainer>
);
