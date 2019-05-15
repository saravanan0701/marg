import React from 'react'

export const UserMenu = ({
  email,
  logout,
  history: {
    push,
    location: {
      pathname,
    }
  }
}) => (
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
            if(pathname.match(/login/)){
              return push(`/login`)
            }
            return push(`/login?returnUrl=${pathname}`)
          }
        } href="/login">
          LOGIN
        </button>
  }
  </div>
)