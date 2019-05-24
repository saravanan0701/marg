import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';
import { DropDown } from './../../commons/';
// import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';

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

const LOAD_PRODUCT_CATEGORIES = gql`
  query LoadProductCategories($query: String) {
    attributes(query: $query){
      edges {
        node {
          name
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
  {
    id: 'Year',
    name: 'Year'
  },
  {
    id: 'Editor',
    name: 'Author/Editor'
  },
  {
    id: 'Category',
    name: 'Category'
  },
];

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

// class Filter extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isOpen: typeof(props.isOpen) !== 'undefined'? props.isOpen: false,
//     }
//     this.toggleIsOpen = this.toggleIsOpen.bind(this);
//   }

//   toggleIsOpen() {
//     if(this.props.alwaysOpen) {
//       return;
//     }
//     this.setState({
//       isOpen: !this.state.isOpen,
//     })
//   }

//   render() {
//     const {
//       isOpen,
//     } = this.state;
//     const {
//       noFilters,
//       filterName,
//       children
//     } = this.props;
//     return (
//       <div className="filter-item">
//         <div className="filter-header" onClick={this.toggleIsOpen}>{ filterName }</div>
//         <Collapse isOpen={isOpen}>
//           {!children && <div>{noFilters? noFilters: 'No Filter found'}</div>}
//           {children}
//         </Collapse>
//       </div>
//     )
//   }
// }

// const FilterListRepeater = ({ filters, addFilter, type }) => (
//   <div>
//     {
//       (filters && filters.length > 0) && (
//         filters.map((filter) => ( 
//           <div
//             onClick={(e) => {addFilter({
//               type,
//               filter
//             })}}
//             key={filter.slug}
//           >
//             {filter.name}
//           </div>
//         ))
//       )
//     }
//   </div>
// )

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px 20px;
  background-color: ${props => props && props.theme && props.theme.sectionBackground};
  justify-content: space-between;
  align-items: center;

  & > div.header {
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 0.59px;
    line-height: 23px;
  }
`

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

        const productTypes = productTypeEdges.reduce((acc, it) => (acc.concat([it.node])), [])

        return <Wrapper>
          <div className="header">Filter By:</div>
          {
            categoryEdges.map((category) => {
              const filter = FILTERS_TO_BE_DISPLAYED.find((it) => (it.id === category.node.name));

              return (
                <DropDown
                  label={filter.name}
                  enableSearch={true}
                  loadData={category.node.values}
                  onOptionSelect={
                    (option) => (
                      addFilter({
                        type: category.node.name,
                        filter: {
                          id: option.id,
                          name: option.name,
                          slug: option.slug,
                        },
                      })
                    )
                  }
                  >
                </DropDown>
              );
            })
          }
          <DropDown
            label={"Sort by:"}
            loadData={[]}
            onOptionSelect={
              (option) => (
                {/*addFilter({
                  type: category.node.name,
                  filter: {
                    id: option.id,
                    name: option.name,
                    slug: option.slug,
                  },
                })*/}
              )
            }
          >
          </DropDown>
        </Wrapper>;
      }
    }
  </Query>
);
