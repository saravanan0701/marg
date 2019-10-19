import React from 'react'

import styled from 'styled-components';
import facebookImg from './../../images/facebook.svg';
import instagramImg from './../../images/instagram.svg';
import twitterImg from './../../images/twitter.svg';

import {Link} from 'react-router-dom';
import {FlatButton, RaisedButton} from './../commons/';
import {Container, Row, Col} from 'reactstrap';


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
    font-family: ${props => props.theme['$font-secondary-medium']};

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
      max-width: 550px;
      width: 100%;
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
        <div id="magazineSubscribe" className='text-center py-5 px-3 full-width'>
            <Link to="/contactus">SUBSCRIBE TO MARG</Link>
            <p className="mx-auto my-3">Founded in 1946, Marg magazine has consistently published original research on
                Indian art and culture, combining scholarly analysis with high-quality, evocative images. </p>
        </div>
        <div className='py-5 full-width bg-gray'>
            <Container className="px-4 px-lg-5">
                <Row>
                    <Col lg='6' className="mb-5 mb-lg-0">
                        <div className="subscribe">
                            <div className="subscribe-heading">Sign up to newsletters:</div>
                            <div className="form my-3">
                                <form
                                    action="https://marg-art.us4.list-manage.com/subscribe/post?u=8139a0209298061024dba15b9&amp;id=cde13e71ed"
                                    method="post" id="mc-embedded-subscribe-form" target="_blank"
                                    name="mc-embedded-subscribe-form" class="validate" novalidate>
                                    <div style={{position: `absolute`, left: `-5000px`}} aria-hidden="true">
                                        <input type="text" name="b_8139a0209298061024dba15b9_cde13e71ed" tabindex="-1"
                                               value=""/>
                                    </div>
                                    <input type="email" name="EMAIL" class="email" id="mce-EMAIL"
                                           placeholder="email address" required placeholder="email address" required
                                           className="subscribe"/>
                                    <RaisedButton type="submit" colorType="primary">Sign up</RaisedButton>
                                </form>
                                <div className="mt-5">
                                    <a target="_blank" href="https://www.facebook.com/TheMargFoundation/"><img
                                        src={facebookImg}/></a>
                                    <a target="_blank" href="https://www.instagram.com/themargfoundation/"><img
                                        className="pl-2" src={instagramImg}/></a>
                                    <a target="_blank" href="https://twitter.com/_margfoundation"><img className="pl-2"
                                                                                                       src={twitterImg}/></a>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg='6'>
                        <Row>
                            <Col lg='6'>
                                <FlatButton className="footer-link" colorType="secondary"><Link
                                    to="/">Home</Link></FlatButton>
                                <FlatButton className='footer-link' colorType="secondary"><Link
                                    to="/categories">Publications</Link></FlatButton>
                                <FlatButton className='footer-link' colorType="secondary"><Link to="/aboutus">About
                                    Marg</Link></FlatButton>
                                <FlatButton hidden={true} className='footer-link'
                                            colorType="secondary">Blog</FlatButton>
                            </Col>
                            <Col lg='6'>
                                <FlatButton className="footer-link" colorType="secondary"><Link
                                    to="/advertise">Advertise</Link></FlatButton>
                                <FlatButton className="footer-link" colorType="secondary"><Link
                                    to="/donate">Donate</Link></FlatButton>
                                <FlatButton className="footer-link" colorType="secondary"><Link
                                    to="/contactus">Contact</Link></FlatButton>
                                <FlatButton hidden={true} className="footer-link"
                                            colorType="secondary">More</FlatButton>
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
              <Link to="/terms-and-conditions">Terms & Conditions</Link>
                &nbsp; | &nbsp;
                <Link to="/privacy-policy">Privacy Policy</Link>
                &nbsp; | &nbsp;
                <p className="d-inline">© 2019 The Marg Foundation</p>
            </span>
                        <span>
              <p className="legal">Designed and built by <a target="_blank" href="https://1stmain.co">1st Main</a></p>
            </span>
                    </Col>
                </Row>
            </Container>
        </div>

    </FooterContainer>
);
