import React from 'react'

import { FlatButton } from './../../commons/FlatButton';

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
        <FlatButton type="primary" onClick={
          () => {
            if(pathname.match(/login/)){
              return push(`/login`)
            }
            return push(`/login?returnUrl=${pathname}`)
          }
        } href="/login">
          Sign in
        </FlatButton>
  }
  </div>
)