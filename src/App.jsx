import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import './App.scss';
import { Home } from './components/Home/index.jsx';
import Auth from './components/auth';
import client from './apollo';
import { StoreFactory } from './redux';

export const history = createBrowserHistory()
const store = StoreFactory(history);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Auth} />
              </Switch>
            </ConnectedRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
