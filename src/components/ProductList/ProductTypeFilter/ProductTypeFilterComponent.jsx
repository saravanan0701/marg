import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';
import { FlatButton } from '../../commons';

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

const LOAD_TYPES = gql`
  query LoadTypes {
    productTypes {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const ProductTypeFilterComponent = ({ productType, selectProductType }) => (
  <Wrapper>
    <Query query={LOAD_TYPES}>
      {
      ({loading, data, error}) => {
            if(loading) {
              return <h4>Loading product types...please wait</h4>
            }
            if(error) {
              return <h4>Error loading product types</h4>
            }
            let menus = [<FlatButton
              key="0"
              onMouseDown={() => selectProductType(null)}
              className={!productType? 'active': ''}
              type="secondary"
              >
              View All
            </FlatButton>];
            data.productTypes.edges.forEach(
              (productTypeIt, id) => menus.push(
                <FlatButton key={id + 1}
                  onMouseDown={() => selectProductType({
                    name: productTypeIt.node.name,
                    id: productTypeIt.node.id,
                  })}
                  className={productType && productType.id === productTypeIt.node.id? 'active': ''}
                  type="secondary"
                >
                  {productTypeIt.node.name}
                </FlatButton>
              )
            );

            return menus.map((menu) => menu);
          }
        }
    </Query>
  </Wrapper>
);
