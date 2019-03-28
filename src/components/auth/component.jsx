import React, { Component } from 'react';
import gql from 'graphql-tag';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }


  handleLogin(event) {
    const {
      client,
    } = this.props;
    event.preventDefault();
    const GET_AUTH_TOKEN = gql(`
      mutation {
        tokenCreate(email: "${this.$email.value}", password: "${this.$password.value}") {
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


  render() {
    const {
      name
    } = this.props;
    
    return (
      <div>
        <form>
          <h1>{name ? `Logged in as ${name}` : 'Please login'}</h1>
          <input
            type="text"
            placeholder="email"
            ref={c => {
              this.$email = (c);
            }}
            />
          <input
            type="password"
            placeholder="password"
            ref={c => {
              this.$password = (c);
            }}
            />
          <button onClick={this.handleLogin}>LOGIN</button>
        </form>
      </div>
    )
  }

}