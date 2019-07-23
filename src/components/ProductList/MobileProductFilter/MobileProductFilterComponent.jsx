import React, { useState } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';
import { withApollo } from 'react-apollo';
import { DropDown } from './../../commons/';
import { FlatButton } from '../../commons';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'reactstrap';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  drawerPaper: {
    height: '90vh'
  },
}));

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

const MobileFilterToggleContainer = styled.div`

  @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      display: none !important;
  }
`

const Wrapper = styled.div`

  div.dropdown {
    width: 100%;
    height: 60px;
    display: flex;
  }
  /* display: flex;
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
  } */
`

const EDITORS_QUERY = gql`
  query FilterEditors($name: String) {
    editors(first:10, name: $name) {
      edges {
        node {
          id
          firstName
          lastName
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
    const getVisibleName = (firstName, lastName) => `${firstName} ${lastName}`;
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
                node: { id, firstName, lastName }
              }
            ) => (
                {
                  id,
                  name: getVisibleName(firstName, lastName),
                }
              )
          )
        )
    )
    const checkIfEditorAlreadySelected = ({ id }) => selectedEditors.filter(({ id: selectedId }) => selectedId === id).length > 0
    return <DropDown
      className={className}
      label={"Editors"}
      enableSearch={true}
      loadData={editors}
      searchData={searchEditors}
      multiSelect={true}
      onOptionSelect={
        (option) => {
          if (checkIfEditorAlreadySelected(option)) {
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
          if (checkIfEditorAlreadySelected(option)) {
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

export const MobileProductFilter = ({
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

  const [filterOpen, setFilterState] = useState(false);
  const classes = useStyles();

  const applyFilter = (attribute) => {
    const filterFound = selectedAttributes.find((it) => it.filter.id === attribute.filter.id);
    if (!filterFound) {
      return addFilter(attribute);
    }
  }

  return (
    <div>
      <MobileFilterToggleContainer>
        <FlatButton id="mobileFilterToggle" onClick={() => setFilterState(!filterOpen)}>FILTERS</FlatButton>
      </MobileFilterToggleContainer>
      
      <SwipeableDrawer
        anchor="bottom"
        open={filterOpen}
        onClose={() => setFilterState(!filterOpen)}
        onOpen={() => setFilterState(!filterOpen)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Wrapper>
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
                  multiSelect={true}
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
      </SwipeableDrawer>
    </div>
  )
}
