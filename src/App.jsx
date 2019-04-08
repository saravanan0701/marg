import React, { Component } from 'react';
import './App.scss';

import { ApolloProvider } from 'react-apollo';
import client from './apollo';

import { Provider } from 'react-redux';
import { StoreFactory } from './redux';

import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import Home from './components/Home';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import { saveState } from './localStorage';

export const history = createBrowserHistory()
const store = StoreFactory(history);

store.subscribe(() => {
  auth: saveState({
    auth: store.getState().auth
  });
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
              <Header />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={LoginForm} />
              </Switch>
            </ConnectedRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
