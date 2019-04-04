import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';

const LOAD_FILTERS = gql`
  query LoadFilters {
    categories(query: "") {
      totalCount
      edges {
        node {
          id
          name
          slug
        }
      }
    }
    attributes(query: "Editor") {
      edges {
        node {
          name
          slug
          values {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

const Filter = ({ filterName, filters, noFilters }) => (
  <div>
    <h1>{ filterName }</h1>
    {(!filters || filters.length == 0) && <div>{noFilters? noFilters: 'No Filter found'}</div>}
    {
      (filters && filters.length > 0) && (
        filters.map((category) => (
            <div key={category.slug}>{category.name}</div>
          )
        )
      )
    }
  </div>
)

export const ProductListFilter = props => (
  <Query query={LOAD_FILTERS}>
    {
      ({loading, error, data}) => {
        if(typeof(error) === "undefined") {
          //TODO: error handling...
        }
        if(loading) {
          //TODO: custom loading...
          return (<h1>Loading options</h1>);
        }
        const {
          attributes: {
            edges: editorEdges,
          },
          categories: {
            edges: categoryEdges,
          }
        } = data;
        const editors = editorEdges[0].node.values;
        const categories = categoryEdges.reduce((acc, it) => (acc.concat([it.node])), [])

        return <div>
          <h1>All Filters</h1>
          <Filter filterName="Categories" filters={categories} noFilters="No Categories Found" />
          <Filter filterName="Editors" filters={editors} noFilters="No Editors Found" />
        </div>;
      }
    }
  </Query>
)
