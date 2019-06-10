import React, { Component } from 'react';

import styled from 'styled-components';

import ProductCard from './ProductCard'

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
      loadProductsError,
    } = this.props;

    return (
      <Wrapper className={`row`}>
        {
          !loadProductsError
            && loadingAllProducts
            && <h3>Loading products please wait(TO be changed).....</h3>
        }
        {
          !loadProductsError
            && !loadingAllProducts
            && products.map((product) => (<ProductCard className="col-4" {...product} />))
        }
        {
          !loadProductsError
            && !loadingAllProducts
            && (!products || (products && products.length == 0))
            && <h3>No products found</h3>
        }
        {
          !loadProductsError
            && loadingNextPage
            && <h3>Loading more products</h3>
        }
        {
          loadProductsError
            && <h3>Error loading page, please refresh</h3>
        }
      </Wrapper>
    )
  }
}