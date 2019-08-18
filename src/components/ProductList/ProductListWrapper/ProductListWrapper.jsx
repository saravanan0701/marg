import React, { Component } from 'react';

import styled from 'styled-components';

import ProductCard from './ProductCard'
import Article from './../../Article';

const Wrapper = styled.div`

  @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
    padding: 20px;
  }
`;
export default class ProductListWrapper extends Component {

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
            && <h3>Loading products.....</h3>
        }
        {
          !loadProductsError
            && !loadingAllProducts
            && products.map((product, id) => {
              if(product.category.name === "Articles") {
                return <Article key={id} className="col-12 p-0" {...product} />;
              } else {
                return <ProductCard key={id} className="col-6 col-lg-4" {...product} />;
              }
            })
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