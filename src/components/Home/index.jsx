import React from 'react';
import ProductList from './ProductList/';

export const Home = props => (
  <div class="container">
    <h1>Home</h1>
    <ProductList />
    <button onClick={() => {
      props.history.push('/login')
    }} href="/login">LOGIN</button>
  </div>
)
