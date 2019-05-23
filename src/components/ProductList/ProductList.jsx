import React, { Component } from 'react';
import styled from 'styled-components';
import { withApollo } from 'react-apollo';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ProductListFilter from './ProductListFilter';
import ProductListWrapper from './ProductListWrapper';
import { FlatButton, DropDown } from './../commons/';

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

const LOAD_PRODUCT_CATEGORIES = gql`
  query LoadProductCategories($query: String) {
    attributes(query: $query){
      edges {
        node {
          name
          values {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export const ProductList = (props) => {

  function searchAttributes() {
    const {
      client,
    } = props;
    return client.query({
      query: LOAD_PRODUCT_CATEGORIES,
      variables: {
        query: "Year"
      }
    })
    .then(({
      data: {
        attributes: {
          edges
        }
      }
    }) => {
      return new Promise((resolve, reject) => {
        if(edges && edges.length === 0) {
          reject();
        }
        resolve(edges[0].node.values);
      })
    })
  }

  return (
    <Wrapper>
      <div className="heading">All Publications</div>
      <div className="product-types">
        <FlatButton type="secondary">View All</FlatButton>
        <FlatButton type="secondary">Magazines</FlatButton>
        <FlatButton type="secondary">Books</FlatButton>
        <FlatButton type="secondary">Digital Archives</FlatButton>
      </div>
      <div>
        <DropDown enableSearch={true} loadData={searchAttributes}>
        </DropDown>
      </div>
      <ProductListFilter />
      <ProductListWrapper />
    </Wrapper>
  );
}

export default withApollo(ProductList);