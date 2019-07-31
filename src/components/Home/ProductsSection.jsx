import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { FlatButton } from './../commons/';
import { Link } from 'react-router-dom';
import ProductCard from './../ProductList/ProductListWrapper/ProductCard/';

const Wrapper = styled.div`

  @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
    padding: 100px 100px;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > .heading {
    color: #000000;
    font-family: "Cormorant Garamond Medium";
    font-size: ${props => props.theme['$font-size-lg']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 1px;
    line-height: 57px;
  }

  & > .link {
    padding-top: 10px;
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
    products(first: $first, categories: $categories) {
      totalCount
      edges {
        node {
          id
          name
          price {
            amount
            currency
          }
          thumbnailUrl(size:500)
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
            firstName
            lastName
          }
        }
      }
    }
  }
`;

export const ProductsSection = ({name, categoryId}) => (
  <Wrapper className="py-5">
    <div className="heading">
      Latest {name}
    </div>
    <Link to="categories" className="link">
      <FlatButton colorType="primary">View All</FlatButton>
    </Link>
    <div className="row">
      <Query
        query={LOAD_PRODUCTS}
        variables={
          {
            sortBy: "updatedAt",
            first: 3,
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
            return data.products.edges.map(
              (product, id) => (
                <ProductCard key={id} className="col-12 col-md-4" {...product.node} />
              )
            )
          }
        }
      </Query>
    </div>
  </Wrapper>
)