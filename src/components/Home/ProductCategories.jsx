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
  query LoadProductCategories($name: String, $first: Int) {
    attributes(query: $name, first: $first){
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
  <Wrapper className="py-5">
    <div className="heading">
      View Publications by Category
    </div>
    <div className="row">
      <Query
        query={LOAD_PRODUCT_CATEGORIES}
        variables={{ name: "Category" , first: 100}}
      >
        {({ loading, error, data }) => {
            let attributes = [];
            if (loading) {
              return <h1>Loading</h1>;
            }
            if(error) {
              return <div>Error loading categories</div>
            }
            if (attributes && data && data.attributes && data.attributes.edges && data.attributes.edges.length > 0) {
              attributes = data.attributes.edges[0].node.values;
            }
            return attributes
              .sort((a, b) => a.name > b.name ? 1 : -1)
              .map(
                (attribute, id) => (
                  <Link to={`/categories/?category=${attribute.slug}`} className="link" key={id}>
                    <FlatButton colorType="secondary">{attribute.name}</FlatButton>
                  </Link>
                )
              )
          }
        }
      </Query>
    </div>
  </Wrapper>
)