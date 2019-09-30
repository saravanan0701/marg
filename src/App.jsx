import React, { Component } from 'react';

import { ApolloProvider } from 'react-apollo';
import client from './apollo';

import { Provider } from 'react-redux';
import { StoreFactory } from './redux';
import { SnackbarProvider } from 'notistack';

import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';

import styled, { ThemeProvider } from 'styled-components';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Header from './components/Header';
import MobileHeader from './components/MobileHeader';
import Footer from './components/Footer';
import actions from './actions';
import { Home } from './components/Home/index.jsx';
import ProductList from './components/ProductList/index.js';
import { AboutUs } from './components/AboutUs.jsx';
import { Team } from './components/Team.jsx';
import { Advertise } from './components/Advertise.jsx';
import { Collaborate } from './components/Collaborate.jsx';
import { Supporters } from './components/Supporters.jsx';
import { Trustees } from './components/Trustees.jsx';
import Donate from './components/Donate.jsx';
import ContactusForm from './components/Contactus/';
import ProductDetails from './components/ProductDetails/';
import background from './images/background4.jpg';
import Theme from './Theme';
import './App.scss';
import Checkout from './components/Checkout/';
import ProtectedRoute from './components/commons/ProtectedRoute';
import Account from './components/Account/';
import { ScrollTop } from './components/ScrollTop';
import SearchResultsContainer from './components/Search/SearchResultsContainer';
import ResetPassword from './components/ResetPassword/index.jsx';
import NotificationManager from './components/NotificationManager/';
import { NotFound } from './components/404.jsx';

export const history = createBrowserHistory()
const store = StoreFactory(history);

const MainContainer = styled.div`

  background-image: url(${background});
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  padding-bottom: 25vh;

  @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
    padding: 10vh 2.5vw 25vh;
  }

  min-height: 100%;

  & > div {
    background: white;
  }

  #app {
    max-width: 1440px !important;
    
    // appHorizontalPadding
    padding-left: ${props => props.theme['appHorizontalPadding']};
    padding-right: ${props => props.theme['appHorizontalPadding']};

    // This counters the appHorizontalPadding above
    .full-width {
      margin-left: -1.5rem;
      margin-right: -1.5rem;
    }

    .full-width-lg-below {
      @media (max-width: 992px) {
        margin-left: -1.5rem;
        margin-right: -1.5rem;
      }
    }

  }

  @media (min-width: 1200px) {
    .container {
      max-width: 1440px;
    }
  }

  .color-red {
    color: ${props => props.theme['primaryColor']};
  }

  .color-black {
    color: black;
  }

  .bg-gray {
    background-color: #f8f8f8;
  }
  
  .heading {
    color: #000000;
    font-family: "Cormorant Garamond Medium";
    font-size: ${props => props.theme['$font-size-lg']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 1px;
    line-height: 57px;
    text-align: center;
    padding-bottom: 80px;
  }
  
`

class App extends Component {
  
  componentDidMount() {
    store.dispatch(actions.rehyderateStateFromCache(client));
    ReactGA.initialize("UA-111691833-1");
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
              <ThemeProvider theme={Theme}>
                <SnackbarProvider>
                  <MainContainer>
                    <div id="app" className='mx-auto position-relative'>
                      <MobileHeader />
                      <Header />
                      <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/categories" component={ProductList} />
                        <Route exact path="/product/:id" component={ProductDetails} />
                        <Route exact path="/login" component={LoginForm} />
                        <Route exact path="/signup" component={SignupForm} />
                        <Route exact path="/aboutus" component={AboutUs} />
                        <Route exact path="/team" component={Team} />
                        <Route exact path="/advertise" component={Advertise} />
                        <Route exact path="/collaborate" component={Collaborate} />
                        <Route exact path="/supporters" component={Supporters} />
                        <Route exact path="/trustees" component={Trustees} />
                        <Route exact path="/contactus" component={ContactusForm} />
                        <Route exact path="/donate" component={Donate} />
                        <Route path="/checkout" component={Checkout} />
                        <ProtectedRoute exact path="/myaccount" component={Account} />
                        <Route exact path="/search" component={SearchResultsContainer} />
                        <Route path="/reset-password" component={ResetPassword} />
                        <Route path="*" component={NotFound} />
                      </Switch>
                      <Footer />
                      <NotificationManager />
                    </div>
                  </MainContainer>
                </SnackbarProvider>
              </ThemeProvider>
            </ConnectedRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
