import React, { Component } from 'react';
import ProductListFilter from './ProductListFilter';

export default class ProductList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <ProductListFilter className="col-3" />
      </div>
    )
  }

}