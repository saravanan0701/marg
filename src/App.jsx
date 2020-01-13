import React, { Component } from "react";

import { ApolloProvider } from "react-apollo";
import client from "./apollo";

import { Provider } from "react-redux";
import { StoreFactory } from "./redux";
import { SnackbarProvider } from "notistack";

import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import ReactGA from "react-ga";

import { ThemeProvider } from "styled-components";

import actions from "./actions";

import Theme from "./Theme";
import "./App.scss";

import BgImageToggler from "./bgImageToggler.jsx";

export const history = createBrowserHistory();
const store = StoreFactory(history);


class App extends Component {
  componentDidMount() {
    console.log(this);
    store.dispatch(actions.rehyderateStateFromCache(client));
    ReactGA.initialize(`${process.env.REACT_APP_GOOGLE_ID}`);
    ReactGA.plugin.require('ecommerce');

    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/firebasejs/7.6.2/firebase-app.js";
    script.async = true;
    document.body.appendChild(script);

    script.src = "https://www.gstatic.com/firebasejs/7.6.2/firebase-analytics.js";
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <ThemeProvider theme={Theme}>
              <SnackbarProvider>
                <BgImageToggler />
              </SnackbarProvider>
            </ThemeProvider>
          </ConnectedRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
