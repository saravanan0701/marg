import React, { Component } from 'react'

export default class HeaderUser extends Component {

  render() {
    const authToken = this.props.authToken;
    const userEmail = this.props.userEmail;
  
    if (!this.props.isLoggedIn) {
      return (
        <button onClick={() => {
          this.props.history.push('/login')
        }} href="/login">
          LOGIN
        </button>
      )
    }
  
    else {
      return (
        <div>
          <p>Welcome, {userEmail}</p>
          <button onClick={() => {this.props.logout()}}>Logout</button>
        </div>
      )
    }
  }
}