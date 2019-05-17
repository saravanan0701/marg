import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { FlatButton } from './../commons/FlatButton.jsx';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  padding: 100px 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > .heading {
    color: #000000;
    font-family: "Cormorant Garamond Medium";
    font-size: ${props => props.theme['$font-size-lg']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 1px;
    line-height: 57px;
    padding-bottom: 50px;
  }

  & > .row {
    width: 80%;
    justify-content: space-around;
  }
`;

const LOAD_PRODUCT_CATEGORIES = gql`
  query LoadProductCategories($name: String) {
    attributes(query: $name){
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

export const ProductCategories = props => (
  <Wrapper>
    <div className="heading">
      View Publications by Category
    </div>
    <div className="row">
      <Query
        query={LOAD_PRODUCT_CATEGORIES}
        variables={
          {
            name: "Category",
          }
        }
        >
        {
          (
            {
              loading, error, data
            }
          ) => {
            let attributes = [];
            if(data.attributes){
              attributes = data.attributes.edges[0].node.values;
            }
            if(Object.keys(data).length == 0 && !loading) {
              return <h1>No categories found</h1>;
            }
            return attributes
              .sort((a, b) => a.name > b.name? 1: -1)
              .map(
                (attribute, id) => (
                  <Link to="categories" className="link" key={id}>
                    <FlatButton type="secondary">{attribute.name}</FlatButton>
                  </Link>
                )
              )
          }
        }
      </Query>
    </div>
  </Wrapper>
)