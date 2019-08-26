import React, { Component } from 'react';
import { Route } from 'react-router';
import ForgotPasswordEmailGenerate from './ForgotPasswordEmailGenerate';
import ForgotPasswordEmailForward from './ForgotPasswordEmailForward';

class ForgotPassword extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact path="/reset-password/generate/" component={ForgotPasswordEmailGenerate} />
        <Route exact path="/reset-password/" component={ForgotPasswordEmailForward} />
      </div>
    )
  }

}

export default ForgotPassword;