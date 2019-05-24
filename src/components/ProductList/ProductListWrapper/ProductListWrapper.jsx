import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import styled from 'styled-components';

import ProductCard from './ProductCard'

const LOAD_PRODUCTS = gql`
  query LoadProducts($query:String) {
    products(query:$query) {
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
  
  constructor(props) {
    super(props);
  }



  render() {
    const {
      filters,
    } = this.props;
    let category = "";
    filters.forEach((it) => {
      if(it.type == 'Category') {
        category = it.filter.name;
      }
    })
    return (<Wrapper className={`row`}>
      <Query
        query={LOAD_PRODUCTS}
        variables={{
          query: category,
        }}>
        {
          ({loading, error, data}) => {
            if(!data || Object.keys(data).length == 0) {
              return <h1>Nothing</h1>;
            }
            return data.products.edges.map(
              (product) => (
                <ProductCard className="col-3" {...product.node} />
              )
            )
          }
        }
      </Query>
    </Wrapper>)
  }
}