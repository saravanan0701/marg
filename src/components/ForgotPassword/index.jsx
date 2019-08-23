import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import ForgotPasswordGenerate from './ForgotPasswordGenerate.jsx';

class ForgotPassword extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact path="/forgot-password/generate/" component={ForgotPasswordGenerate} />
      </div>
    )
  }

}

export default ForgotPassword;