import React, { Component } from 'react'
import './Header.scss'

import HeaderUser from '../HeaderUser'

export default class Header extends Component {
  render() {
    return (
      <div className='nav'>
        <HeaderUser />
      </div>
    )
  }
}