import React, { Component } from 'react';
import styled from 'styled-components';

import { Query } from "react-apollo";
import gql from 'graphql-tag';

import ProductListFilter from './ProductListFilter';
import ProductListWrapper from './ProductListWrapper';
import CategoryFilter from './CategoryFilter';
import ProductListPagination from './ProductListPagination';
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

//Note: Assuming there are always 2 product types.
const LOAD_ALL_FILTERS = gql`
  query LoadAllFilters {
    categories(first:10) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
    attributes(first:10) {
      edges {
        node {
          id
          name
          slug
          values {
            id
            name
            slug
          }
        }
      }
    }
  }
`

const ProductList = () => (
  <Wrapper>
    <div className="heading">All Publications</div>
    <Query
      query={LOAD_ALL_FILTERS}>
      {
        ({
          loading,
          error,
          data: {
            categories,
            attributes,
          }
        }) => {
          const productVariants = {};
          if(loading) {
            return <h1>Loading...</h1>;
          }
          if(!categories || Object.keys(categories).length == 0) {
            return <h1>No categories found</h1>;
          }
          else {
            categories = categories.edges.map(({node}) => ({
              id: node.id,
              name: node.name,
              slug: node.slug,
            }));
            attributes = attributes.edges.map((attribute) => attribute.node);
          }
          return (
            <div>
              <CategoryFilter categories={categories} />
              <ProductListFilter filters={attributes}/>
              <ProductListWrapper />
              <ProductListPagination />
            </div> 
          )
        }
      }
    </Query>
  </Wrapper>
);

export default ProductList;