import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';
import { FlatButton } from './../../commons/';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 30px;
  & > div {
    margin-left: 50px;

    &.active {
      border-bottom: 1px solid ${props => props.theme.primaryColor};
    }
  }
`;

const LOAD_CATEGORIES = gql`
  query LoadCategories {
    categories(query: "") {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`;

export const ProductCategoryFilterComponent = ({ category, selectCategory }) => (
  <Wrapper>
    <Query query={LOAD_CATEGORIES}>
      {
      ({loading, data, error}) => {
            if(loading) {
              return <h4>Loading Categories, please wait</h4>
            }
            if(error) {
              return <h4>Error loading categories</h4>
            }
            let menus = [<FlatButton
              key="0"
              onMouseDown={() => selectCategory(null)}
              className={!category? 'active': ''}
              type="secondary"
              >
              View All
            </FlatButton>];
            data.categories.edges.forEach(
              (categoryIt, id) => menus.push(
                <FlatButton key={id + 1}
                  onMouseDown={() => selectCategory({
                    name: categoryIt.node.name,
                    slug: categoryIt.node.slug,
                    id: categoryIt.node.id,
                  })}
                  className={category && category.slug === categoryIt.node.slug? 'active': ''}
                  type="secondary"
                >
                  {categoryIt.node.name}
                </FlatButton>
              )
            );

            return menus.map((menu) => menu);
          }
        }
    </Query>
  </Wrapper>
);
