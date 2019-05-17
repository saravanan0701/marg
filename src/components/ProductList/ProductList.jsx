import React, { Component } from 'react';
import styled from 'styled-components';

import ProductListFilter from './ProductListFilter';
import ProductListWrapper from './ProductListWrapper';
import { FlatButton } from './../commons/FlatButton.jsx';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px 150px;

  & > .heading {
    font-family: "Cormorant Garamond Medium";
    font-size: ${props => props.theme['$font-size-lg']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 1px;
    line-height: 42px;
    text-align: center;
  }

  & > .product-types {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 30px;

    & > div {
      margin-left: 50px;
    }
  }
`;

export const ProductList = (props) => (
  <Wrapper>
    <div className="heading">All Publications</div>
    <div className="product-types">
      <FlatButton type="secondary">View All</FlatButton>
      <FlatButton type="secondary">Magazines</FlatButton>
      <FlatButton type="secondary">Books</FlatButton>
      <FlatButton type="secondary">Digital Archives</FlatButton>
    </div>
    <ProductListFilter />
    <ProductListWrapper />
  </Wrapper>
);