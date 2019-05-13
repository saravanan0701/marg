import React, { Component } from 'react';

import { ApolloProvider } from 'react-apollo';
import client from './apollo';

import { Provider } from 'react-redux';
import { StoreFactory } from './redux';

import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import './App.scss';
import LoginForm from './components/LoginForm';
// import Home from './components/Home';
import Header from './components/Header';
import actions from './actions';
import { Home } from './components/Home/index.jsx';

export const history = createBrowserHistory()
const store = StoreFactory(history);

class App extends Component {
  
  componentDidMount() {
    store.dispatch(actions.rehyderateStateFromCache(client));
  }

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
