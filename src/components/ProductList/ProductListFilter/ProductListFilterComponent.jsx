import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { withApollo } from 'react-apollo';
import { DropDown } from './../../commons/';
import { getParamsObjFromString } from './../../../utils/';

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

  & > div.header {
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 0.59px;
    line-height: 23px;
    width: 12%;
    max-width: 12%;
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

const EditorSearch = withApollo(
  ({
    client,
    applyFilter,
    removeFilter,
    editors,
    addEditor,
    removeEditor,
    selectedEditors,
    //Redux related variable which makes sure
    // a selected item is not selected again and again.
    // even if there's an inconsistency redux is not affected by it
    removeAllEditors,
    className,
    urlEditorId,
    replaceEditor,
    // This editor-id is fetched from the URL.
    // We fetch editor details and set it as selected.
  }) => {
    const [showEditorDropDown, setShowEditorDropDown] = useState(false);
    const [urlSelectedEditor, setUrlSelectedEditors] = useState();
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
    );

    const loadEditor = () => (
      client.query({
        query: FETCH_EDITOR,
        variables: {
          id: urlEditorId,
          first: 1
        }
      }).then(({data:{editors: { edges }={} }={} }, errors) => {
        if(edges.length > 0 && (!errors || errors.length === 0)) {
          setUrlSelectedEditors(edges[0].node);
          addEditor(edges[0].node);
        }
        setShowEditorDropDown(true);
      })
    )
    useEffect(() => {
      const checkIfEditorAlreadyLoaded = (editorId) => {
        const selectedEditor = selectedEditors.find(({id}) => urlEditorId === id);
        if(selectedEditor && selectedEditor.name) {
          return false
        }
        return true;
      }
      if(urlEditorId && checkIfEditorAlreadyLoaded(urlEditorId)) {
        setShowEditorDropDown(false);
        loadEditor();
      } else {
        setShowEditorDropDown(true);
      }
      
    }, []);

    const checkIfEditorAlreadySelected = ({ id }) => selectedEditors.filter(({id: selectedId}) => selectedId === id).length > 0
    if(!showEditorDropDown){
      return <div>Loading..</div>;
    }

    const filteredSelectedEditors = selectedEditors.reduce((acc, editor) => {
      if(editor.name) {
        return acc.concat(editor);
      }
      return acc;
    }, [])

    return <DropDown
      className={className}
      label={"Editors"}
      enableSearch={true}
      loadData={editors}
      defaultOption={filteredSelectedEditors}
      searchData={searchEditors}
      multiSelect={true}
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
  let urlEditorId;
  if(queryKeys.length > 0) {
    if(queryKeys[0] === "editor-id") {
      urlEditorId = queryObj['editor-id'];
    }
  }


  const urlAttrs = [];
  if (queryKeys.length > 0) {
    if (queryKeys[0] === "category-id") {
      urlAttrs.push({
        type: "category",
        value: queryObj['category-id'],
      });
    }
  }

  urlAttrs.forEach(({type, value}) => {
    const attr = filters.find((filter) => filter.slug === type);
    if(attr) {
      if(canDehyderateUrl || selectedAttributes.find(({type: filterType, filter: {id: filterVal }}) => type === filterType && value === filterVal)) {
        return;
      }
      addFilter({
        type: type,
        filter: attr.values.find(({id}) => (id === value))
      });
    }
  })


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
    <EditorSearch
      className="dropdown"
      key={selectedEditors.length > 0? selectedEditors[selectedEditors.length - 1].id: "editors"}
      addEditor={addEditor}
      removeEditor={removeEditor}
      removeAllEditors={removeAllEditors}
      editors={editors}
      selectedEditors={selectedEditors}
      urlEditorId={urlEditorId}
      replaceEditor={replaceEditor}
    >
    </EditorSearch>
    {
      filters.map((filterObj, id) => {
        return (
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
      })
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
