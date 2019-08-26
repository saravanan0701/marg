import React, { Component } from 'react';
import { Route } from 'react-router';
import GenerateEmail from './GenerateEmail';
import ForgotPasswordEmailForward from './ForgotPasswordEmailForward';

class ForgotPassword extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact path="/reset-password/generate/" component={GenerateEmail} />
        <Route exact path="/reset-password/" component={ForgotPasswordEmailForward} />
      </div>
    )
  }

}

export default ForgotPassword;