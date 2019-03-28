import React, { Component } from 'react';
import client from '../../apollo';
import gql from 'graphql-tag';

export default class Login extends Component {

  constructor(props) {
    super(props);

    // this.state = {
    //     email: '',
    //     password: ''
    // };

    // this.handleEmailChange = this.handleEmailChange.bind(this);
    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  // handleEmailChange(event) {
  //   this.setState({ email: event.target.value });
  // }

  // handlePasswordChange(event) {
  //   this.setState({ password: event.target.value });
  // }

  render() {
    const {
      name
    } = this.props;
    return (
      <div>
        <form>
          <h1>{name ? `Logged in as ${name}` : 'Please login'}</h1>
          <input type="text" placeholder="email" />
          <input type="passwowrd" placeholder="password" />
          <button onClick={this.handleLogin}>LOGIN</button>
        </form>
      </div>
    )
  }

  handleLogin(event) {

    event.preventDefault();

    const GET_AUTH_TOKEN = gql(`
      mutation {
        tokenCreate(email:"uday@1stmain.co", password:"test1234") {
          token
        }
      }
    `);

    client.mutate({
      mutation: GET_AUTH_TOKEN,
    })
    .then(
      ({ data, loading }) => {
        this.props.loginAs({
          name: 'Uday',
          token: data.tokenCreate.token,
        });
        console.log(data.tokenCreate.token, loading);
      },
      (err, loading) => {
        console.log(err, loading);
      }
    );

  }

}