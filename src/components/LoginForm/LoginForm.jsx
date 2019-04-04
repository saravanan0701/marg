import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


export default class Login extends Component {

  state = {
    email: '',
    password: '',
  }

  handleLogin = async data => {
    const { token } = data.tokenCreate;
    localStorage.setItem("authToken", token);
  }

  render() {

    const { email, password } = this.state

    const GET_AUTH_TOKEN = gql(`
      mutation LoginMutation($email: String!, $password: String!) {
        tokenCreate(email: $email, password: $password) {
          token,
          errors {
            message 
          }
        }
      }
    `);

    return (
      <div>
        <input type="text" placeholder="email" value={email} onChange={e => this.setState({ email: e.target.value })} />
        <input type="password" placeholder="password" value={password} onChange={e => this.setState({ password: e.target.value })} />

        <Mutation
          mutation={GET_AUTH_TOKEN}
          variables={{ email, password }}
          onCompleted={(data) => this.handleLogin(data)}
        >
          { tokenCreate => (
            <a onClick={tokenCreate}>Login</a>
          )}
        </Mutation>
      </div>
    )
  }
}