import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
        email: '',
        password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    //this.handleLogin = this.handleLogin.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
    console.log("Hello");
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {

    const GET_AUTH_TOKEN = gql(`
      mutation {
        tokenCreate(email: "${this.state.email}", password: "${this.state.password}") {
          token,
          errors {
            message 
          }
        }
      }
    `);

    return (
        <Mutation mutation={GET_AUTH_TOKEN}>
          {(tokenCreate, { data }) => {
            // if (data) {
            //   this.props.loginAs(data);
            // }
            return ( 
            <div>
              <form onSubmit={event => {
                event.preventDefault();
                tokenCreate();
              }}>
                <input type="text" placeholder="email" value={this.state.email} onChange={this.handleEmailChange} />
                <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} />
                <button type="submit">LOGIN</button>
                {data && data.tokenCreate.errors[0].message && <p>Oops</p>}
              </form>
            </div>
            )
          }}
        </Mutation>

      
    );
  }
}