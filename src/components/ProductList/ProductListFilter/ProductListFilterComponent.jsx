import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';
import { withApollo } from 'react-apollo';
import { DropDown } from './../../commons/';

const SORT_BY = [
  {
    name: "Price Low-High",
    id: "PRICE_LOW_HIGH",
    key: "PRICE",
    val: "ASC"
  },
  {
    name: "Price High-Low",
    id: "PRICE_HIGH_LOW",
    key: "PRICE",
    val: "DESC"
  },
  {
    name: "Name Increasing",
    id: "NAME_LOW_HIGH",
    key: "NAME",
    val: "ASC"
  },
  {
    name: "Name Decreasing",
    id: "NAME_HIGH_LOW",
    key: "NAME",
    val: "DESC"
  },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px 20px;
  background-color: ${props => props && props.theme && props.theme.sectionBackground};
  justify-content: space-between;

  & > div.header {
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 0.59px;
    line-height: 23px;
    width: 12%;
    max-width: 12%;
  }

  & > div.dropdown {
    margin-left: 2%;
    width: 20%;
    max-width: 20%;
  }
`

const EDITORS_QUERY = gql`
  query FilterEditors($name: String) {
    editors(first:10, name: $name) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const EditorSearch = withApollo(
  ({
    client,
    applyFilter,
    removeFilter,
    editors,
    addEditor,
    removeEditor,
    selectedEditors,
    removeAllEditors,
    className,
  }) => {
    const searchEditors = (name) => client.query({
      query: EDITORS_QUERY,
      variables: {
        name,
      }
    }).then(
      (
        {
          data: {
            editors: {
              edges
            }
          }
        }
      ) => (
        edges.map(
          (
            {
              node: { id, name }
            }
          ) => (
            {
              id,
              name
            }
          )
        )
      )
    )
    const checkIfEditorAlreadySelected = ({ id }) => selectedEditors.filter(({id: selectedId}) => selectedId === id).length > 0
    return <DropDown
      className={className}
      label={"Editors"}
      enableSearch={true}
      loadData={editors}
      searchData = {searchEditors}
      multiSelect = {true}
      onOptionSelect={
        (option) => {
          if(checkIfEditorAlreadySelected(option)) {
            return;
          }
          addEditor({
            id: option.id,
            name: option.name,
          })
        }
      }
      onOptionClose={
        (option) => {
          if(checkIfEditorAlreadySelected(option)) {
            removeEditor({
              id: option.id,
            })
          }
        }
      }
      onUnselectAll={
        () => (
          removeAllEditors()
        )
      }
    >
    </DropDown>
  }
);

export const ProductListFilter = ({
  client,
  addFilter,
  removeFilter,
  removeAllAttributeFiltersBySlug,
  className,
  addSortBy,
  resetSortBy,
  filters,
  editors,
  addEditor,
  removeEditor,
  removeAllEditors,
  selectedAttributes,
  selectedEditors,
}) => {
  const applyFilter = (attribute) => {
    const filterFound = selectedAttributes.find((it) => it.filter.id === attribute.filter.id);
    if(!filterFound) {
      return addFilter(attribute);
    }
  }
  return <Wrapper className="d-none d-lg-flex">
    <div className="header">Filter By:</div>
    <EditorSearch
      className="dropdown"
      key={"editors"}
      addEditor={addEditor}
      removeEditor={removeEditor}
      removeAllEditors={removeAllEditors}
      editors={editors}
      selectedEditors={selectedEditors}
    >
    </EditorSearch>
    {
      filters.map((filterObj, id) => {
        return (
          <DropDown
            className="dropdown"
            key={filterObj.slug}
            label={filterObj.name}
            enableSearch={true}
            loadData={filterObj.values}
            multiSelect = {true}
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
                removeFilter(option.id)
                // filter object which contains details is not required
                // because we remove based on attribute.filter.id and not the filter type.
              )
            }
            onUnselectAll={
              () => (
                removeAllAttributeFiltersBySlug(filterObj.slug)
              )
            }
          >
          </DropDown>
        );
      })
    }
    <DropDown
      className="dropdown"
      key={"sort"}
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
