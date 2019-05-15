import React, { Component } from 'react';

import { ApolloProvider } from 'react-apollo';
import client from './apollo';

import { Provider } from 'react-redux';
import { StoreFactory } from './redux';

import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import styled, { ThemeProvider } from 'styled-components';

import LoginForm from './components/LoginForm';
import Header from './components/Header';
import actions from './actions';
import { Home } from './components/Home/index.jsx';
import background from './images/background.png';
import Theme from './Theme';
import './App.scss';

export const history = createBrowserHistory()
const store = StoreFactory(history);

const MainContainer = styled.div`
  background-image: url(${background});
  background-attachment: fixed;
  background-position: center;
  padding: 10vh 2.5vw 25vh;
  min-height: 100%;

  & > div {
    background: white;
  }
`

class App extends Component {
  
  componentDidMount() {
    store.dispatch(actions.rehyderateStateFromCache(client));
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
              <ThemeProvider theme={Theme}>
                <MainContainer>
                  <div>
                    <Header />
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/login" component={LoginForm} />
                    </Switch>
                  </div>
                </MainContainer>
              </ThemeProvider>
            </ConnectedRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
