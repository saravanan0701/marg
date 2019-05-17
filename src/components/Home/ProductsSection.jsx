import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { FlatButton } from './../commons/FlatButton.jsx';
import { Link } from 'react-router-dom';
import ProductCard from './../ProductList/ProductListWrapper/ProductCard/';

const Wrapper = styled.div`
  padding: 100px 100px;

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
    padding-bottom: 50px;
  }

  & > .row {
    width: 100%;
    justify-content: center;
  }
`;

const LOAD_PRODUCTS = gql`
  query LoadProducts($sortBy:String, $last: Int) {
    products(sortBy:$sortBy, last: $last) {
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
    }
  }
`;

export const ProductsSection = props => (
  <Wrapper>
    <div className="heading">
      Latest Magazines
    </div>
    <Link to="categories" className="link">
      <FlatButton type="primary">View All</FlatButton>
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
            console.log(loading, data, error);
            if(Object.keys(data).length == 0) {
              return <h1>Nothing</h1>;
            }
            return data.products.edges.map(
              (product, id) => (
                <ProductCard key={id} className="col-3" {...product.node} />
              )
            )
          }
        }
      </Query>
    </div>
  </Wrapper>
)