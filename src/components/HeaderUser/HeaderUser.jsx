import React from 'react'

const HeaderUser = props => {

  const authToken = props.authToken;
  const userEmail = props.userEmail;

  if (!props.isLoggedIn) {
    return (
      <button onClick={() => {
        //this.props.history.push('/login')
      }} href="/login">
        LOGIN
      </button>
    )
  }

  else {
    return (
      <div>
        <p>Welcome, {userEmail}</p>
        <button onClick={() => {props.logout()}}>Logout</button>
      </div>
    )
  }
}

export default HeaderUser;