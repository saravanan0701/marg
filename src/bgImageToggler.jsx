import React,{ useEffect } from "react";
import { withRouter } from "react-router";
import styled, { ThemeProvider } from "styled-components";
import background from "./images/background4.jpg";
import historyBackground from "./images/historyBackground.jpg";
import { Route, Switch } from "react-router";
import MobileHeader from "./components/MobileHeader";
import Header from "./components/Header";
import { Home } from "./components/Home/index.jsx";
import ProductList from "./components/ProductList/index.js";
import ProductDetails from "./components/ProductDetails/";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { AboutUs } from "./components/AboutUs.jsx";
import { Team } from "./components/Team.jsx";
import { Advertise } from "./components/Advertise.jsx";
import { Collaborate } from "./components/Collaborate.jsx";
import { Supporters } from "./components/Supporters.jsx";
import { Trustees } from "./components/Trustees.jsx";
import Donate from "./components/Donate.jsx";
import ContactusForm from "./components/Contactus/";
import Checkout from "./components/Checkout/";
import ProtectedRoute from "./components/commons/ProtectedRoute";
import Account from "./components/Account/";
import SearchResultsContainer from "./components/Search/SearchResultsContainer";
import ResetPassword from "./components/ResetPassword/index.jsx";
import NotificationManager from "./components/NotificationManager/";
import { PrivacyPolicy } from "./components/PrivacyPolicy.jsx";
import { TermsAndConditions } from "./components/TermsAndConditions.jsx";
import { NotFound } from "./components/404.jsx";
import Footer from "./components/Footer";
import Subscriptions from "./components/Subscriptions";
import History from './components/History/index';
import Blog from './components/Blogs/blog';
import Events from "./components/Events";
import SingleEvent from "./components/Events/SingleEvent";

const MainContainer = styled.div`
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  padding-bottom: 25vh;
  @media (min-width: ${props => props.theme["mobileBreakpoint"]}) {
    padding: 10vh 2.5vw 25vh;
  }
  min-height: 100%;
  & > div {
    background: white;
  }
  #app {
    max-width: 1440px !important;
    // appHorizontalPadding
    padding-left: ${props => props.theme["appHorizontalPadding"]};
    padding-right: ${props => props.theme["appHorizontalPadding"]};
    // This counters the appHorizontalPadding above
    .full-width {
      margin-left: -15px;
      margin-right: -15px;
    }
    .full-width-lg-below {
      @media (max-width: 992px) {
        margin-left: -15px;
        margin-right: -15px;
      }
    }
  }
  @media (min-width: 1200px) {
    .container {
      max-width: 1440px;
    }
  }
  .color-red {
    color: ${props => props.theme["primaryColor"]};
  }
  .color-black {
    color: black;
  }
  .bg-gray {
    background-color: #F8F8F8;
  }
  .heading {
    color: #000000;
    font-family: ${props => props.theme["$font-secondary-medium"]};
    font-size: ${props => props.theme["$font-size-lg"]};
    font-weight: ${props => props.theme["$weight-regular"]};
    letter-spacing: 1px;
    line-height: 57px;
    text-align: center;
    margin-bottom: 10px;
  }
`;
const BgImageToggler = ({location: {pathname}}) =>{
  const backGround = pathname === "/history"? { backgroundImage : `url(${historyBackground})` } :  { backgroundImage : `url(${background})` };
  const backGroundColor = pathname !== "/history"? { backgroundColor : "white" } : { backgroundColor : "initial" };
  return(
    <MainContainer style = { backGround }>
      <div id="app" style = { backGroundColor } className="mx-auto position-relative">
        <MobileHeader />
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/categories" component={ProductList} />
          <Route
            exact
            path="/product/:id"
            component={ProductDetails}
          />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/team" component={Team} />
          <Route exact path="/advertise" component={Advertise} />
          <Route
            exact
            path="/collaborate"
            component={Collaborate}
          />
          <Route exact path="/supporters" component={Supporters} />
          <Route exact path="/trustees" component={Trustees} />
          <Route
            exact
            path="/contactus"
            component={ContactusForm}
          />
          {/* <Route exact path="/donate" component={Donate} /> */}
          <Route path="/checkout" component={Checkout} />
          <ProtectedRoute
            exact
            path="/myaccount"
            component={Account}
          />
          <Route
            exact
            path="/search"
            component={SearchResultsContainer}
          />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route
            path="/terms-and-conditions"
            component={TermsAndConditions}
          />
          <Route
            path="/subscriptions"
            component={Subscriptions}
          />
          <Route
              exact
              path="/history"
              component={History}
          />
          <Route
              exact
              path="/blog"
              component={Blog}
          />
          <Route
              exact
              path="/event"
              component={Events}
          />
          <Route
              exact
              path="/event/:id"
              component={SingleEvent}
          />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer applyBackGroundColor = { pathname !== "/history" ? true : false } />
        <NotificationManager />
      </div>
    </MainContainer>
  );
}
export default withRouter(BgImageToggler);
