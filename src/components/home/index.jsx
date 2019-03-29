import React from 'react';

export const Home = props => (
  <div>
    <h1>Home</h1>
    <button onClick={() => {
      props.history.push('/login')
    }} href="/login">LOGIN</button>
  </div>
)
