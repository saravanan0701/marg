import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
// import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';

import './ProductListFilter.scss';
// const AsyncTypeahead = asyncContainer(Typeahead);

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
    attributes(query: "") {
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

const FILTERS_TO_BE_DISPLAYED = [
  'Category',
  'Editor',
  'Year',
]

// const SEARCH_ATTRIBUTES = gql`
//   query SearchAttributes($name:String!){
//     attributes(query: $name) {
//       edges {
//         node {
//           name
//           slug
//           values {
//             id
//             name
//             slug
//           }
//         }
//       }
//     }
//   }
// `;

// class AttributeSearch extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: false,
//       arrtibutes: [],
//     }
//     this.searchAttributes = this.searchAttributes.bind(this);
//   }

//   searchAttributes(attributeName) {
//     this.setState({
//       isLoading: true,
//     })
//     this.props.client.query({
//       query: SEARCH_ATTRIBUTES,
//       variables: { name: "a" },
//     })
//     console.log(this.props.client);
//   }

//   render() {
//     return <AsyncTypeahead
//       {...this.state}
//       onSearch={this.searchAttributes}
//       ></AsyncTypeahead>
//   }
// }

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
      <div className="filter-item">
        <div className="filter-header" onClick={this.toggleIsOpen}>{ filterName }</div>
        <Collapse isOpen={isOpen}>
          {!children && <div>{noFilters? noFilters: 'No Filter found'}</div>}
          {children}
        </Collapse>
      </div>
    )
  }
}

const FilterListRepeater = ({ filters, addFilter, type }) => (
  <div>
    {
      (filters && filters.length > 0) && (
        filters.map((filter) => ( 
          <div
            onClick={(e) => {addFilter({
              type,
              filter
            })}}
            key={filter.slug}
          >
            {filter.name}
          </div>
        ))
      )
    }
  </div>
)

export const ProductListFilter = ({
  client,
  addFilter,
  className
}) => (
  <Query query={LOAD_FILTERS}>
    {
      ({loading, error, data}) => {
        if(typeof(error) !== "undefined") {
          //TODO: error handling...
          return (<h1>ERRor loading</h1>);
        }
        if(typeof(loading) === "undefined" || loading) {
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
        const productTypes = productTypeEdges.reduce((acc, it) => (acc.concat([it.node])), [])

        return <div className={`${className} filter-container`}>
          <div className="main-header">Filter By</div>
          <Filter
            isOpen={true}
            alwaysOpen={true}
            filterName="All Publications"
            noFilters="No Types Found"
            >
            <FilterListRepeater
              type="Category"
              addFilter={addFilter}
              filters={productTypes}
            />
          </Filter>
          {
            categoryEdges.map((category) => (
              FILTERS_TO_BE_DISPLAYED.findIndex((it) => (it === category.node.name)) != -1 &&
              <Filter
                key={category.node.slug}
                filterName={`By ${category.node.name}`}
                noFilters={`No ${category.node.name} Found`}
                >
                <FilterListRepeater
                  type={category.node.name}
                  addFilter={addFilter}
                  filters={category.node.values}
                />
              </Filter>
            ))
          }
        </div>;
      }
    }
  </Query>
)
