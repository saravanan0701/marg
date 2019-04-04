import React, { Component } from 'react';
import ProductListFilter from './ProductListFilter';

export default class ProductList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>ProductList</h1>
        <ProductListFilter />
      </div>
    )
  }

}