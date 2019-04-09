import React, { Component } from 'react'

export const UserMenu = ({userEmail, history, logout}) => (
  <div>
  {
    userEmail
      ?
        <div>
          <p>Welcome, {userEmail}</p>
          <button onClick={() => {logout()}}>Logout</button>
        </div>
      :
        <button onClick={
          () => {
            history.push('/login')
          }
        } href="/login">
          LOGIN
        </button>
  }
  </div>
)