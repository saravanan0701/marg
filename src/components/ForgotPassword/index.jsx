import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import ForgotPasswordEmailGenerate from './ForgotPasswordEmailGenerate';

class ForgotPassword extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact path="/forgot-password/generate/" component={ForgotPasswordEmailGenerate} />
      </div>
    )
  }

}

export default ForgotPassword;