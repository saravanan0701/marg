import React, { Component } from 'react'
import './Header.scss'

import UserMenu from './UserMenu'

export default class Header extends Component {
  render() {
    return (
      <div className='nav'>
        <UserMenu />
      </div>
    )
  }
}