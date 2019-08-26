import React, { Component } from 'react';
import { Route } from 'react-router';
import GenerateEmail from './GenerateEmail';
import SetPassword from './SetPassword';

class ForgotPassword extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact path="/reset-password/generate/" component={GenerateEmail} />
        <Route exact path="/reset-password/" component={SetPassword} />
      </div>
    )
  }

}

export default ForgotPassword;