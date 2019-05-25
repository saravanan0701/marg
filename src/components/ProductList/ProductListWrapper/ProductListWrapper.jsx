import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import styled from 'styled-components';

import ProductCard from './ProductCard'

const LOAD_PRODUCTS = gql`
  query LoadProducts($query:String, $attributes:[AttributeScalar]) {
    products(query:$query, attributes:$attributes) {
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
      attributes,
      category,
    } = this.props;

    const getHyphenLowerCase = (value) => (value.toLowerCase().replace(/\ /g, '-'));

    const queryAttributes = [];
    attributes.forEach((it) => {
      queryAttributes.push(`${getHyphenLowerCase(it.type)}:${getHyphenLowerCase(it.filter.name)}`);
    });
    return (<Wrapper className={`row`}>
      <Query
        query={LOAD_PRODUCTS}
        variables={
          {
            attributes: queryAttributes,
            category: category && category.id,
          }
        }>
        {
          ({loading, error, data}) => {
            if(!data || Object.keys(data).length == 0) {
              return <h1>Nothing</h1>;
            }
            return data.products.edges.map(
              (product) => (
                <ProductCard className="col-4" {...product.node} />
              )
            )
          }
        }
      </Query>
    </Wrapper>)
  }
}