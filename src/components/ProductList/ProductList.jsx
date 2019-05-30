import React, { Component } from 'react';
import styled from 'styled-components';

import { Query } from "react-apollo";
import gql from 'graphql-tag';

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

const LOAD_ALL_FILTERS = gql`
  query LoadAllFilters {
    productTypes {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

export const ProductList = (props) => (
  <Wrapper>
    <div className="heading">All Publications</div>
    <Query
      query={LOAD_ALL_FILTERS}>
      {
        ({loading, error, data}) => {
          if(!data || Object.keys(data).length == 0) {
            return <h1>Nothing</h1>;
          }
          return (
            <div>
              <ProductTypeFilter availableProductTypes={data.productTypes.edges} />
              <ProductListFilter />
              <ProductListWrapper />
            </div> 
          )
        }
      }
    </Query>
  </Wrapper>
);

export default ProductList;