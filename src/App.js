import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Auth from './components/auth'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="test">Test</div>
        <Auth />
      </div>
    );
  }
}

export default App;
