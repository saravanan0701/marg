import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import UserMenu from "./UserMenu";
import styled from "styled-components";
import logo from "./../../images/Header_marg_transparent.gif";
import { FlatButton, Menu } from "./../commons/";
import { Container, Row, Col } from "reactstrap";
import emblem from "../../images/emblem.png";
import FontAwesome from "react-fontawesome";

const HeaderContainer = styled.div`
  display: none;

  @media (min-width: ${props => props.theme["mobileBreakpoint"]}) {
    display: block;
  }

  #headerLogoLink {
    cursor: pointer;
    max-width: 195px;
    margin-bottom: -58px;
    z-index: 11;
  }

  .logo-text {
    color: #37312f;
    font-size: ${props => props.theme["$font-size-xxs"]};
    font-weight: ${props => props.theme["$weight-regular"]};
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
      font-weight: ${props => props.theme["$weight-bold"]};
      letter-spacing: 3px;
      text-transform: uppercase;
      cursor: pointer;
      margin-right: 45px;

      &.active {
        border-bottom: 1px solid ${props => props.theme["primaryColor"]};
      }
    }
  }
`;

const Header = ({
  history: {
    push,
    location: { pathname }
  },
  cartQuantity
}) => (
  <HeaderContainer>
    <Container className="py-4 d-none d-lg-block px-0">
      <Row style={{ minHeight: 110 }}>
        <Col
          lg="2"
          className="d-flex align-items-center justify-content-center flex-column"
        >
          <Link id="headerLogoLink" to="/">
            <img alt="" className="img-fluid" src={logo} />
          </Link>
        </Col>
        <Col
          id="rightCol"
          lg="10"
          className="d-flex flex-column justify-content-between"
        >
          <Row>
            <Col xs="12" className="d-flex justify-content-end">
              <UserMenu />
              <FlatButton
                onClick={e => cartQuantity > 0 && push("/checkout/cart")}
                className="ml-4"
                colorType="primary"
              >
                <span className="color-black">Cart—</span>
                {cartQuantity}
              </FlatButton>
            </Col>
          </Row>
          <Row>
            <Col xs="12" className="d-flex justify-content-end">
              <div className="menu d-flex align-items-center flex-wrap px-0">
                <Link
                  className={pathname.match("categories") ? "active" : ""}
                  to="/categories"
                >
                  Publications
                </Link>
                {/* <Link
                  className={pathname.match("blog") ? "active" : ""}
                  to="/categories"
                >
                  Blog
                </Link> */}
                <Link
                  className={pathname.match("advertise") ? "active" : ""}
                  to="/advertise"
                >
                  Advertise
                </Link>
                {/* <Link
                  className={pathname.match("donate") ? "active" : ""}
                  to="/donate"
                >
                  Donate
                </Link> */}
                <Menu label="About Marg">
                  <Link to="/aboutus">About Marg</Link>
                  {/* <Link to="/collaborate">Historical Timeline</Link> */}
                  <Link to="/team">Marg team</Link>
                  <Link to="/supporters">SUPPORTERS/SPONSORS</Link>
                  <Link to="/trustees">TRUSTEES/ADVISORY</Link>
                </Menu>
                <Menu label="More">
                  <Link>Marg Events</Link>
                  <Link to="/collaborate">Collaborate</Link>
                  <Link>Submit Proposals</Link>
                  <Link>Film Archive</Link>
                  <Link
                    className={pathname.match("contactus") ? "active" : ""}
                    to="/contactus"
                  >
                    Contact
                  </Link>
                </Menu>
              </div>
              <div className="menu mr-0">
                <Link className="m-0" to="/search">
                  SEARCH
                  <FontAwesome
                    id="searchIcon"
                    name="search"
                    className="color-red ml-2"
                  />
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </HeaderContainer>
);

export default withRouter(Header);
