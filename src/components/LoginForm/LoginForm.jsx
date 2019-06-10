import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { FlatButton, RaisedButton } from './../commons/';


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

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 100px 100px;

  & > div{
    width: 50%;
    display: flex;
    flex-direction: column;

    & > .heading {
      color: #000000;
      font-family: "Cormorant Garamond Medium";
      font-size: ${props => props.theme['$font-size-lg']};
      font-weight: ${props => props.theme['$weight-bold']};
      letter-spacing: 1px;
      line-height: 57px;
      padding-bottom: 30px;
    }

    & > .label {
      color: #000000;
      font-size: ${props => props.theme['$font-size-xxs']};
      font-weight: ${props => props.theme['$weight-bold']};
      letter-spacing: 3px;
      text-transform: uppercase;
      padding-bottom: 15px;
      padding-top: 50px;
    }

    & > input {
      border: 1px solid #cccccc;
      padding: 10px;
    }

    & > .forgot-button {
      align-self: flex-end;
      padding-top: 10px;
      padding-right: 0px !important;
    }

    & > .login-button {
      align-self: flex-start;
    }

    & > .signup {
      padding-top: 50px;
      display: flex;
      flex-direction: row;

      & > div.button {
        padding-left: 10px;
      }
    }
  }
`;

export default class Login extends Component {

  state = {
    email: '',
    password: '',
  } 

  handleLogin = async (data) => {
    if (data.tokenCreate.errors && data.tokenCreate.errors.length > 0) {
      return this.props.loginFailure();
    }
    const { token } = data.tokenCreate;
    this.props.loginSuccess({
      email: this.state.email,
      authToken: token
    });
  }

  componentDidUpdate() {
    const {
      email,
      history: {
        location: {
          search,
        },
        push,
      },
    } = this.props;
    if(email && search) {
      //User has loggedin
      let returnUrl = search
        .slice(1)
        .split('&')
        .map(q => q.split('='))
        .reduce((retPath, it) => {
          if(it[0] == "returnUrl") {
            return it[1];
          }
          return retPath;
        }, null);
      push(returnUrl == null? "/": returnUrl);
    }
  }

  render() {
    const { email, password } = this.state

    return (
      <Wrapper>
        <div>
          <div className="heading">Sign In</div>
          <div className="label">Email</div>
          <input type="text" placeholder="email" value={email} onChange={e => this.setState({ email: e.target.value })} />
          <div className="label">Password</div>
          <input type="password" placeholder="password" value={password} onChange={e => this.setState({ password: e.target.value })} />
          <FlatButton className="forgot-button">Forgot password</FlatButton>
          <Mutation
            mutation={GET_AUTH_TOKEN}
            variables={{ email, password }}
            onCompleted={(data) => this.handleLogin(data)}
          >
            {
              (tokenCreate, { loading }) => (
                <div className="login-button">
                  <RaisedButton onClick={tokenCreate}>{ loading ? 'Logging in...' : 'Sign in'}</RaisedButton>
                </div>
              )
            }
          </Mutation>
          <div className="signup">
            <div>Don’t have an account? </div>
            <FlatButton className="button">Register</FlatButton>
          </div>
        </div>
      </Wrapper>
    )
  }
}