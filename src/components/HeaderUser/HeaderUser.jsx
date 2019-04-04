import React from 'react'

const HeaderUser = props => {

  const authToken = localStorage.getItem('authToken');
  const userEmail = localStorage.getItem('userEmail');

  if (authToken == null) {
    return (
      <button onClick={() => {
        props.history.push('/login')
      }} href="/login">
        LOGIN
      </button>
    )
  }

  else {
    return (
      <div>
        <p>Welcome, {userEmail}</p>
        <button onClick={() => {localStorage.removeItem('authToken'); localStorage.removeItem('userEmail');}}>Logout</button>
      </div>
    )
  }
}

export default HeaderUser;