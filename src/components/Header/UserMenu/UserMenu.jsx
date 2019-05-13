import React from 'react'

export const UserMenu = ({email, history, logout}) => (
  <div>
  {
    email
      ?
        <div>
          <p>Welcome, {email}</p>
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