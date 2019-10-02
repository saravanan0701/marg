import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Query } from "react-apollo";
import gql from 'graphql-tag';
import { withRouter } from "react-router";

import ProductListFilter from './ProductListFilter';
import MobileProductFilter from './MobileProductFilter';
import ProductListWrapper from './ProductListWrapper';
import CategoryFilter from './CategoryFilter';
import ProductListPagination from './ProductListPagination';
import { FlatButton } from './../commons/';
import { getParamsObjFromString } from './../../utils/';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
    padding: 50px 100px 100px;
  }

  & > .heading {
    font-family: "Cormorant Garamond Medium";
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
    editors(first:10) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

const ProductList = ({
  resetAllFilters,
  addFilter,
  location: {
    search,
  },
}) => {

  useEffect(() => () => {
    // Hook to cleanup on unmount,
    resetAllFilters();
  }, [])

  
  return (
    <Wrapper className="mt-2 mb-2">
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
              editors,
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
              }
            }

            categories = categories.edges.map(({node}) => node);
            attributes = attributes.edges.map(({node}) => node);
            editors = editors.edges.map(({ node: {id, name } }) => ({id, name}))
            
            urlAttrs.forEach(({type, value}) => {
              const attr = attributes.find((filter) => filter.slug === type);
              if(attr) {
                addFilter({
                  type: type,
                  filter: attr.values.find(({id}) => (id === value))
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
              <div>
                <CategoryFilter categories={categories} />
                <ProductListFilter categories={mainCategories} filters={attributes} editors={editors}/>
                <MobileProductFilter categories={mainCategories} filters={attributes} />
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