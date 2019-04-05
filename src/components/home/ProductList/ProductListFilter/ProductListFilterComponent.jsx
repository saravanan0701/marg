import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

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
    attributes(query: "Category") {
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

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: typeof(props.isOpen) !== 'undefined'? props.isOpen: false,
    }
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
  }

  toggleIsOpen() {
    if(this.props.alwaysOpen) {
      return;
    }
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const {
      isOpen,
    } = this.state;
    const {
      noFilters,
      filterName,
      children
    } = this.props;
    return (
      <div>
        <h1 onClick={this.toggleIsOpen}>{ filterName }</h1>
        <Collapse isOpen={isOpen}>
          {!children && <div>{noFilters? noFilters: 'No Filter found'}</div>}
          {children}
        </Collapse>
      </div>
    )
  }
}

const FilterListRepeater = ({ filters }) => (
  <div>
    {
      (filters && filters.length > 0) && (
        filters.map((filter) => ( 
          <div key = {
            filter.slug
          } > {
            filter.name
          }</div>
        ))
      )
    }
  </div>
)

export const ProductListFilter = props => (
  <Query query={LOAD_FILTERS}>
    {
      ({loading, error, data}) => {
        if(typeof(error) !== "undefined") {
          //TODO: error handling...
        }
        if(loading) {
          //TODO: custom loading...
          return (<h1>Loading options</h1>);
        }
        const {
          attributes: {
            edges: categoryEdges,
          },
          categories: {
            edges: productTypeEdges,
          }
        } = data;
        // const categoryEdges = data.attributes.edges;
        // TODO: to be removed.
        const categories = categoryEdges[0].node.values;
        const productTypes = productTypeEdges.reduce((acc, it) => (acc.concat([it.node])), [])

        return <div>
          <h1>All Filters</h1>
          <Filter isOpen={true} alwaysOpen={true} filterName="All Publications" noFilters="No Types Found">
            <FilterListRepeater filters={productTypes} />
          </Filter>
          <Filter filterName="Categories" noFilters="No categories Found">
            <FilterListRepeater filters={categories} />
          </Filter>
        </div>;
      }
    }
  </Query>
)
