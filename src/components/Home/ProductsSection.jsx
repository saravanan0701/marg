import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { FlatButton } from './../commons/';
import { Link } from 'react-router-dom';
import ProductCard from './../ProductList/ProductListWrapper/ProductCard/';

const Wrapper = styled.div`

  @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
    padding: 100px 0;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > .heading {
    color: #000000;
    font-family: ${props => props.theme['$font-secondary-medium']};
    font-size: ${props => props.theme['$font-size-lg']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 1px;
    line-height: 57px;
  }

  & > .link {
    padding-top: 0;
    padding-bottom: 50px;
  }

  & > .row {
    width: 100%;
    justify-content: center;
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      padding: 0px 50px;
    }
  }
`;

const LOAD_PRODUCTS = gql`
  query LoadProducts($first: Int, $categories: [ID]!) {
    products(first: $first, categories: $categories, sortBy:{ field:DATE,direction:DESC }) {
      totalCount
      edges {
        node {
          id
          name
          variants{
            sku
            isDigital
            inrPrice {
              amount
              currency
              localized
            }
            usdPrice {
              amount
              currency
              localized
            }
          }
          images{
            url
          }
          attributes{
            attribute{
              name
              slug
            }
            value {
              name
            }
          }
          editors {
            id
            name
          }
        }
      }
    }
  }
`;

export const ProductsSection = ({name, categoryId, slug}) => (
  <Wrapper className="py-5 px-xl-5">
    <div className="heading">
      Latest {name}
    </div>
    <Link to={`categories?product-type=${slug}`} className="link">
      <FlatButton colorType="primary">View All</FlatButton>
    </Link>
    <div className="row">
      <Query
        query={LOAD_PRODUCTS}
        variables={
          {
            sortBy: "updatedAt",
            first: 4,
            categories: [categoryId],
          }
        }
        >
        {
          ({loading, error, data}) => {
            if(loading) {
              return <h1>loading..</h1>;
            }
            if(error) {
              return <div>Error loading products</div>
            }
            if(data.products.length === 0) {
              return (<div>No {name} found</div>)
            }
            return data.products.edges.map(
              (product, id) => (
                <ProductCard key={id} className="col-6 col-lg-3" {...product.node} />
              )
            )
          }
        }
      </Query>
    </div>
  </Wrapper>
)