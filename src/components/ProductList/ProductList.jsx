import React, { Component } from 'react';
import styled from 'styled-components';

import ProductListFilter from './ProductListFilter';
import ProductListWrapper from './ProductListWrapper';
import ProductTypeFilter from './ProductTypeFilter';
import { FlatButton } from './../commons/';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 100px 100px;

  & > .heading {
    font-family: "Cormorant Garamond Medium";
    font-size: ${props => props.theme['$font-size-lg']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 1px;
    line-height: 42px;
    text-align: center;
  }
`;

export const ProductList = (props) => (
  <Wrapper>
    <div className="heading">All Publications</div>
    <ProductTypeFilter />
    <ProductListFilter />
    <ProductListWrapper />
  </Wrapper>
);

export default ProductList;