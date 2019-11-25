import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { FlatButton } from './../commons/';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`

  @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
    padding: 100px 100px;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .category-link {
    border: 1px solid #3a3a3a;
    padding: 5px 10px;
  }

  & > .heading {
    color: #000000;
    font-family: ${props => props.theme['$font-secondary-medium']};
    font-size: ${props => props.theme['$font-size-lg']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 1px;
    line-height: 57px;
    padding-bottom: 50px;
    text-align: center;
  }

  & > .row {
    width: 90%;
    /* justify-content: space-around; */
  }
`;

const LOAD_PRODUCT_CATEGORIES = gql`
  query LoadPublicationCategories($first: Int) {
    publicationCategories(first: $first){
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const ProductCategories = props => (
  <Wrapper className="py-5">
    <div className="heading">
      View Publications by Category
    </div>
    <div className="row">
      <Query
        query={LOAD_PRODUCT_CATEGORIES}
        variables={{ first: 100}}
      >
        {({ loading, error, data }) => {
            let publicationCategories = [];
            if (loading) {
              return <h1>Loading</h1>;
            }
            if(error) {
              return <div>Error loading categories</div>
            }
            if (publicationCategories && data && data.publicationCategories && data.publicationCategories.edges && data.publicationCategories.edges.length > 0) {
              publicationCategories = data.publicationCategories.edges;
            }
            return publicationCategories
              .sort((a, b) => a.name > b.name ? 1 : -1)
              .map(
                ({node}, id) => (
                  <Link to={`/categories/?category-id=${node.id}`} className="category-link mx-2 my-3" key={id}>
                    <FlatButton colorType="secondary">{node.name}</FlatButton>
                  </Link>
                )
              )
          }
        }
      </Query>
    </div>
  </Wrapper>
)