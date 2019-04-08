import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';

const LOAD_PRODUCTS = gql`
  query LoadProducts($query:String) {
    products(query:$query) {
      totalCount
      edges {
        node {
          id
          name
        }
      }

      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
export default class ProductListWrapper extends Component {
  
  constructor(props) {
    super(props);
    // this.state = {
      // currentPage: 1,
      // pageSize: 5,
    // }
  }



  render() {
    const {
      filters,
      className
    } = this.props;
    let category = "";
    filters.forEach((it) => {
      if(it.type == 'Category') {
        category = it.filter.name;
      }
    })
    return (<div className={`row ${className}`}>
      <Query
        query={LOAD_PRODUCTS}
        variables={{
          query: category,
        }}>
        {
          ({loading, error, data}) => {
            console.log(loading, data, error);
            if(Object.keys(data).length == 0) {
              return <h1>Nothing</h1>;
            }
            return data.products.edges.map((product) => (<div>{product.node.name}</div>))
          }
        }
      </Query>

    </div>)
  }
}