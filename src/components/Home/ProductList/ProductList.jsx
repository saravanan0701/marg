import React, { Component } from 'react';
import ProductListFilter from './ProductListFilter';
import ProductListWrapper from './ProductListWrapper';

export const ProductList = (props) => (
  <div className="row">
    <ProductListFilter className="col-3" />
    <ProductListWrapper className="col-9" />
  </div>
);