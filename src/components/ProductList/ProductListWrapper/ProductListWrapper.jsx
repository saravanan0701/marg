import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import styled from 'styled-components';

import ProductCard from './ProductCard'

const LOAD_PRODUCTS = gql`
  query LoadProducts($query:String, $attributes:[AttributeScalar], $sortBy:String, $first:Int!, $after:String) {
    products(query:$query, attributes:$attributes, sortBy:$sortBy, first:$first, after:$after) {
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
    this.state = {
      products: [],
      paginationStatus: false,
      //INITIATED, PAGINATED
    }
  }

  loadProducts() {
    const {
      attributes,
      productType,
      sortBy,
      client,
      updatePagingData,
      pagination: {
        first,
        after
      },
    } = this.props;

    const getHyphenLowerCase = (value) => (value.toLowerCase().replace(/\ /g, '-'));

    const queryAttributes = [];
    attributes.forEach((it) => {
      queryAttributes.push(`${getHyphenLowerCase(it.type)}:${getHyphenLowerCase(it.filter.name)}`);
    });

    return client.query({
      query: LOAD_PRODUCTS,
      variables: {
        first,
        after,
        attributes: queryAttributes,
        category: category && category.id,
        sortBy: sortBy && sortBy.val,
      }
    }).then(({data: { products: { edges, pageInfo } }}) => {
      updatePagingData({
        first,
        after: pageInfo.endCursor,
      });
      this.setState({
        paginationStatus: "INITIATED",
      })
      return edges;
    });
  }

  setProducts() {
    return this
      .loadProducts()
      .then((products) => {
        console.log("PRODUCTS: on state", products);
        this.setState({
          products,
        })
      })
  }

  appendProducts() {
    this
      .loadProducts()
      .then((products) => {
        console.log("PRODUCTS: on state", products);
        this.setState({
          products: this.state.products.concat(products),
        })
      })
  }

  componentDidMount() {
    this.setProducts();
  }

  componentDidUpdate(prevProps) {
    //TODO: Add `productType` filter check.
    if(this.props.attributes != prevProps.attributes
        || this.props.sortBy != prevProps.sortBy) {
      this.setProducts();      
    }

    if(this.props.pagination != prevProps.pagination
        && (this.state.paginationStatus && this.state.paginationStatus != "INITIATED")) {
      this.appendProducts();
    }
  }

  render() {
    const {
      products,
    } = this.state;

    return (
      <Wrapper className={`row`}>
        {
          products.map((product) => (<ProductCard className="col-4" {...product.node} />))
        }
      </Wrapper>
    )
  }
}