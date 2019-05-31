import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import styled from 'styled-components';

import ProductCard from './ProductCard'

const LOAD_PRODUCTS = gql`
  query LoadProducts($query:String, $productTypeName: String, $attributes:[AttributeScalar], $sortBy:String, $first:Int!, $after:String) {
    products(query:$query, productType_Name:$productTypeName, attributes:$attributes, sortBy:$sortBy, first:$first, after:$after) {
      totalCount
      edges {
        node {
          id
          name
          price {
            amount
            currency
          }
          thumbnailUrl
          attributes{
            attribute{
              name
            }
            value {
              name
            }
          }
        }
      }

      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const Wrapper = styled.div`
  padding: 20px;
`;
export default class ProductListWrapper extends Component {
  
  componentDidMount() {
    const {
      loadProducts,
      client,
    } = this.props;
    loadProducts(client);
  }


  render() {
    const {
      products,
      loadingAllProducts,
      loadingNextPage,
    } = this.props;

    return (
      <Wrapper className={`row`}>
        {
          loadingAllProducts && <h3>Loading products please wait(TO be changed).....</h3>
        }
        {
          !loadingAllProducts && products.map((product) => (<ProductCard className="col-4" {...product} />))
        }
        {
          loadingNextPage && <h3>Loading more products</h3>
        }
      </Wrapper>
    )
  }
}