import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DropDown } from './../../commons/';
import { getParamsObjFromString } from './../../../utils/';
import { AjaxSearch } from './AjaxSearch.jsx';
import gql from 'graphql-tag';

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

const EDITORS_QUERY = gql`
  query FilterEditors($name: String, $categoryIds: [ID]) {
    editors(first:10, name: $name, categoryIds: $categoryIds) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const PUBLICATION_CATEGORIES_QUERY = gql`
  query PublicationCategories($name: String, $publicationTypes: [ID]) {
    publicationCategories(first:50, name: $name, publicationTypes: $publicationTypes) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const FETCH_EDITOR = gql`
  query FilterEditors($first:Int, $id: ID) {
    editors(first:$first, ids: [$id]) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const FETCH_CATEGORY = gql`
  query FilterEditors($first:Int, $id: Int) {
    publicationCategories(first:$first, ids: [$id]) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  & > div.header {
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 0.59px;
    line-height: 23px;
    width: 12%;
    max-width: 12%;
  }
`;

const searchEditors = (client, name, selectedCategories) => client.query({
  query: EDITORS_QUERY,
  variables: {
    name,
    categoryIds: selectedCategories.map(({id}) => id),
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
);

const searchPublicationCategories = (client, name, selectedCategories) => client.query({
  query: PUBLICATION_CATEGORIES_QUERY,
  variables: {
    name,
    publicationTypes: selectedCategories.map(({id}) => id),
  }
}).then(
  (
    {
      data: {
        publicationCategories: {
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
);

const loadEditor = (client, urlEditorId) => (
  client.query({
    query: FETCH_EDITOR,
    variables: {
      id: urlEditorId,
      first: 1
    }
  }).then(({ data: { editors: { edges } = {} } = {} }, errors) => {
    if (edges.length > 0 && (!errors || errors.length === 0)) {
      return edges[0].node
    }
    return;
  })
)

const loadCategory = (client, urlCategoryId) => (
  client.query({
    query: FETCH_CATEGORY,
    variables: {
      id: urlCategoryId,
      first: 1
    }
  }).then(({ data: { publicationCategories: { edges } = {} } = {} }, errors) => {
    if (edges.length > 0 && (!errors || errors.length === 0)) {
      return edges[0].node
    }
    return;
  })
)

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
  selectedCategories,
  categories,
  replaceCategoryFilters,
  replaceEditor,
  canDehyderateUrl,
  setUrlDeHyderation,
  location: {
    search
  }
}) => {
  const queryObj = getParamsObjFromString(search);
  const queryKeys = Object.keys(queryObj);
  let urlEditorId, urlCategoryId;
  if(queryKeys.length > 0) {
    if(queryKeys[0] === "editor-id") {
      urlEditorId = queryObj['editor-id'];
    }
    if(queryKeys[0] === "category-id") {
      urlCategoryId = queryObj['editor-id'];
    }
  }


  const applyFilter = (attribute) => {
    const filterFound = selectedAttributes.find((it) => it.filter.id === attribute.filter.id);
    if(!filterFound) {
      return addFilter(attribute);
    }
  }

  let selectedCategoryValues = [], selectedYearValues = [];
  if(selectedAttributes && selectedAttributes.length > 0) {
    selectedCategoryValues = selectedAttributes.reduce((acc, {type, filter}) => {
      if(type === "category") {
        return acc.concat({...filter});
      }
      return acc;
    }, []);
    selectedYearValues = selectedAttributes.reduce((acc, {type, filter}) => {
      if(type === "year") {
        return acc.concat({...filter});
      }
      return acc;
    }, []);
  }

  const articlesIsSelected = selectedCategories.filter(({slug}) => (slug === "articles")).length > 0? true: false;
  return <Wrapper className={className}>
    {
      !articlesIsSelected &&
      <DropDown
        className="dropdown"
        key={selectedCategories.length > 0? selectedCategories[0].slug: "product-type"}
        label={"Format"}
        loadData={categories}
        defaultOption={selectedCategories.length === 1? selectedCategories[0]: null}
        onOptionSelect={
          (option) => (
            replaceCategoryFilters([option])
          )
        }
        onOptionClose={
          (option) => (
            replaceCategoryFilters(categories)
          )
        }
        onUnselectAll={
          (option) => (
            replaceCategoryFilters(categories)
          )
        }
      >
      </DropDown>
    }
    <AjaxSearch
      className="dropdown"
      label="Editors/Authors"
      key={selectedEditors.length > 0? selectedEditors[selectedEditors.length - 1].id: "editors"}
      addItem={addEditor}
      removeItem={removeEditor}
      removeAllItems={removeAllEditors}
      selectedItems={selectedEditors}
      urlItemId={urlEditorId}
      replaceEditor={replaceEditor}
      setUrlDeHyderation={setUrlDeHyderation}
      selectedCategories={selectedCategories}
      searchData={searchEditors}
      loadItem={loadEditor}
    >
    </AjaxSearch>
    {
      filters.reduce((acc, filterObj) => {
        if(filterObj.slug === "category" && articlesIsSelected) {
          return acc;
        }

        if(filterObj.slug === "category") {
          return acc.concat(
            <AjaxSearch
              className="dropdown"
              label="Category"
              key={selectedCategoryValues.length > 0? selectedCategoryValues[0].id: "categories"}
              addItem={
                (option) => applyFilter({
                  type: filterObj.slug,
                  filter: {
                    ...option
                  },
                })
              }
              removeItem={
                (option) => {
                  removeFilter(option.id)
                  if(filterObj.slug === "category" && selectedAttributes.find(({filter: {id: filterId}}) => filterId === option.id)) {
                    setUrlDeHyderation(true);
                  }
                  // filter object which contains details is not required
                  // because we remove based on attribute.filter.id and not the filter type.
                }
              }
              removeAllItems={
                () => {
                  removeAllAttributeFiltersBySlug(filterObj.slug)
                  setUrlDeHyderation(true);
                }
              }
              selectedItems={selectedCategoryValues}
              urlItemId={urlCategoryId}
              // replaceEditor={replaceEditor}
              setUrlDeHyderation={setUrlDeHyderation}
              selectedCategories={selectedCategories}
              searchData={searchPublicationCategories}
              loadItem={loadCategory}
            >
            </AjaxSearch>
          )
        }

        return acc.concat(
          <DropDown
            className="dropdown"
            key={
              (() => {
                if(filterObj.slug === "category") {
                  return selectedCategoryValues.length > 0? selectedCategoryValues[0].id: filterObj.slug;
                } else if(filterObj.slug === "year") {
                  return selectedYearValues.length > 0? selectedYearValues[0].id: filterObj.slug;
                }
                return filterObj.slug;
              })()
            }
            label={filterObj.name}
            enableSearch={true}
            loadData={filterObj.values}
            multiSelect = {true}
            defaultOption={
              (() => {
                if(filterObj.slug === "category") {
                  return selectedCategoryValues;
                } else if(filterObj.slug === "year") {
                  return selectedYearValues;
                }
                return null;
              })()
            }
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
              (option) => {
                removeFilter(option.id)
                if(filterObj.slug === "category" && selectedAttributes.find(({filter: {id: filterId}}) => filterId === option.id)) {
                  setUrlDeHyderation(true);
                }
                // filter object which contains details is not required
                // because we remove based on attribute.filter.id and not the filter type.
              }
            }
            onUnselectAll={
              () => {
                removeAllAttributeFiltersBySlug(filterObj.slug)
                setUrlDeHyderation(true);
              }
            }
          >
          </DropDown>
        );
      }, [])
    }
    {/*<DropDown
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
    </DropDown>*/}
  </Wrapper>
}
