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

export const ProductTypeFilterComponent = ({
  productType, 
  selectProductType, 
  availableProductTypes 
}) => {
  
  const menus = [
    <FlatButton
      key="0"
      onMouseDown={() => selectProductType(null)}
      className={!productType? 'active': ''}
      type="secondary"
      >
      View All
    </FlatButton>
  ];

  availableProductTypes.forEach((type) => {
    console.log(type.name);
  });

  availableProductTypes.forEach(
    (productTypeIt, id) => menus.push(
      <FlatButton key={id + 1}
        onMouseDown={() => selectProductType({
          name: productTypeIt.name,
          id: productTypeIt.id,
        })}
        className={productType && productType.id === productTypeIt.node.id? 'active': ''}
        type="secondary"
      >
        {productTypeIt.name}
      </FlatButton>
    )
  );

  return (
    <Wrapper>
      { menus.map((menu) => menu) }
    </Wrapper>
  )
}
