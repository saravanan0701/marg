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
  query LoadProducts($last: Int) {
    products(last: $last) {
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

export const ProductsSection = props => (
  <Wrapper className="py-5">
    <div className="heading">
      Latest Magazines
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
            last: 3,
          }
        }
        >
        {
          ({loading, error, data}) => {
            if(!data || Object.keys(data).length == 0) {
              return <h1>Nothing</h1>;
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