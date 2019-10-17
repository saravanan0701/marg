import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Query } from "react-apollo";
import gql from 'graphql-tag';
import { withRouter } from "react-router";

import { DesktopListFilterComponent } from './ProductListFilter/DesktopListFilterComponent.jsx';
import { MobileListFilterComponent } from './ProductListFilter/MobileListFilterComponent.jsx';
import ProductListWrapper from './ProductListWrapper';
import CategoryFilter from './CategoryFilter';
import ProductListPagination from './ProductListPagination';
import { FlatButton } from './../commons/';
import { getParamsObjFromString } from './../../utils/';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > .heading {
    font-family: ${props => props.theme['$font-secondary-medium']};
    font-size: ${props => props.theme['$font-size-sm']};
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      font-size: ${props => props.theme['$font-size-lg']};
    }
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 1px;
    line-height: 42px;
    text-align: center;
  }
`;

//Note: Assuming there are always 2 product types.
const LOAD_ALL_FILTERS = gql`
  query LoadAllFilters {
    categories(first:10) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
    attributes(first:10) {
      edges {
        node {
          id
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
`

const ProductList = ({
  resetAllFilters,
  addFilter,
  addEditor,
  canDehyderateUrl,
  selectedEditors,
  selectedAttributes,
  selectedCategories,
  location: {
    search,
  },
}) => {


  
  const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 992);

  useState(() => {
    window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 992));
  }, [])

  useEffect(() => () => {
    // Hook to cleanup on unmount,
    resetAllFilters();
  }, [])

  const articlesIsSelected = selectedCategories.filter(({slug}) => (slug === "articles")).length > 0? true: false;

  
  return (
    <Wrapper className="mt-2 mb-2 py-5 px-xl-5">
      <div className="heading">All Publications</div>
      <Query
        query={LOAD_ALL_FILTERS}>
        {
          ({
            loading,
            error,
            data: {
              categories,
              attributes,
            }={}
          }) => {
            const productVariants = {};
            if(loading) {
              return <h1>Loading...</h1>;
            }
            if(!categories || Object.keys(categories).length == 0) {
              return <h1>No categories found</h1>;
            }

            const queryObj = getParamsObjFromString(search);
            const queryKeys = Object.keys(queryObj);
            const urlAttrs = [];
            if(queryKeys.length > 0) {
              if(queryKeys[0] === "category-id") {
                urlAttrs.push({
                  type: "category",
                  value: queryObj['category-id'],
                });
              } else if(queryKeys[0] === "editor-id") {
                urlAttrs.push({
                  type: "editor",
                  value: queryObj['editor-id'],
                });
              }
            }

            categories = categories.edges.map(({node}) => node);
            attributes = attributes.edges.map(({node}) => node);
            
            urlAttrs.forEach(({type, value}) => {
              const attr = attributes.find((filter) => filter.slug === type);
              if(attr) {
                if(!canDehyderateUrl || selectedAttributes.find(({type: filterType, filter: {id: filterVal }}) => type === filterType && value === filterVal)) {
                  return
                }
                addFilter({
                  type: type,
                  filter: attr.values.find(({id}) => (id === value))
                });
              } else if(type === "editor" && !selectedEditors.find(({id}) => id === value)) {
                if(!canDehyderateUrl) {
                  return;
                }
                addEditor({
                  id: value,
                });
              }
            })

            // Filtering `mainCategories` here because DropDown component checks if loadData has changed,
            // and if changed it set selectedOptions to []. Even after selecting an option its always unselected.
            const mainCategories = categories.map(({id, name, slug}) => ({
              id,
              name,
              slug,
            })).filter(({slug}) => slug !== "articles")
            return (
              <div className="container">
                <CategoryFilter categories={categories} />
                {
                  isMobile?
                    <MobileListFilterComponent categories={mainCategories} filters={attributes} />
                    :
                    <DesktopListFilterComponent articlesIsSelected={articlesIsSelected} categories={mainCategories} filters={attributes} />
                }
                <ProductListWrapper />
                <ProductListPagination />
              </div> 
            )
          }
        }
      </Query>
    </Wrapper>
  );
};

export default withRouter(ProductList);