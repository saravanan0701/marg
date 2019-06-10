import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';
import { DropDown } from './../../commons/';

const SORT_BY = [
  {
    name: "Price Low-High",
    slug: "PRICE_LOW_HIGH",
    id: "PRICE",
    val: "ASC"
  },
  {
    name: "Price High-Low",
    slug: "PRICE_HIGH_LOW",
    id: "PRICE",
    val: "DESC"
  },
  {
    name: "Name Increasing",
    slug: "NAME_LOW_HIGH",
    id: "NAME",
    val: "ASC"
  },
  {
    name: "Name Decreasing",
    slug: "NAME_HIGH_LOW",
    id: "NAME",
    val: "DESC"
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
  filters
}) => {
  const applyFilter = (filter) => {
    const filterFound = attributes.find((it) => it.type === filter.type);
    if(filterFound) {
      return replaceFilter(filter);
    }
    return addFilter(filter);
  }
  return <Wrapper>
    <div className="header">Filter By:</div>
      {
        filters.map((filterObj) => {
          return (
              <DropDown
                label={filterObj.name}
                enableSearch={true}
                loadData={filterObj.values}
                onOptionSelect={
                  (option) => (
                    applyFilter({
                      type: filterObj.slug,
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
                      type: filterObj.slug,
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
  </Wrapper>
}
