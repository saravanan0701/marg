import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'hamburgers/dist/hamburgers.css';
import 'lato-font/css/lato-font.css';
import 'font-awesome/css/font-awesome.min.css';
import 'typeface-cormorant-garamond/index.css';
import 'react-phone-number-input/style.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
