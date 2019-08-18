import React from 'react'
import { Link } from 'react-router-dom'

import { FlatButton, Menu } from './../../commons/';

export const UserMenu = ({
  email,
  logout,
  history: {
    push,
  },
  location,
}) => (
  <div>
  {
    email
      ?
        <div>
          <Menu label={"MY ACCOUNT"}>
            <Link to="/myaccount">ORDERS & PROFILE</Link>
            {/* <Link to="">MY SUBSCRIPTIONS</Link> */}
            <Link onClick={() => {logout()}}>SIGN OUT</Link>
          </Menu>
        </div>
      :
        <FlatButton colorType="#000000" onClick={
          () => {
            if(location.pathname.match(/login/)){
              return push(`/login`)
            }
            return push(`/login`, {from: location})
          }
        } href="/login">
          Sign in
        </FlatButton>
  }
  </div>
)