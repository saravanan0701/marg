import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';
import { DropDown } from './../../commons/';

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

const SORT_BY = [
  {
    name: "Price Low-High",
    slug: "PRICE_LOW_HIGH",
    val: "price"
  },
  {
    name: "Price High-Low",
    slug: "PRICE_HIGH_LOW",
    val: "-price"
  },
  {
    name: "Name Increasing",
    slug: "NAME_INCREASING",
    val: "name"
  },
  {
    name: "Name Decreasing",
    slug: "NAME_DECREASING",
    val: "-name"
  },
];

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
  replaceFilter,
  removeFilter,
  className,
  attributes,
  addSortBy,
  resetSortBy,
}) => {
  const applyFilter = (filter) => {
    const filterFound = attributes.find((it) => it.type === filter.type);
    if(filterFound) {
      return replaceFilter(filter);
    }
    return addFilter(filter);
  }
  return (
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
                      applyFilter({
                        type: category.node.name,
                        filter: {
                            id: option.id,
                            name: option.name,
                            slug: option.slug,
                          },
                        })
                      )
                    }
                  onOptionClose={
                    (option) => (
                      removeFilter({
                        type: category.node.name,
                        // filter object which contains details is not required
                        // because we remove based on filter type and not the filter itself.
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
              loadData={SORT_BY}
              onOptionSelect={
                (option) => (
                  addSortBy(option)
                )
              }
              onOptionClose={
                (option) => (
                  resetSortBy()
                )
              }
            >
            </DropDown>
          </Wrapper>;
        }
      }
    </Query>
  );
}
