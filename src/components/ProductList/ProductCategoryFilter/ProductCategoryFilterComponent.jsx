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

export const ProductCategoryFilterComponent = ({ category, selectCategory }) => (
  <Wrapper>
    <FlatButton
      onMouseDown={() => selectCategory(null)}
      className={!category? 'active': ''}
      type="secondary"
      >
      View All
    </FlatButton>
    <FlatButton
      onMouseDown={() => selectCategory('magazines')}
      className={category === 'magazines'? 'active': ''}
      type="secondary"
      >
      Magazines
    </FlatButton>
    <FlatButton
      onMouseDown={() => selectCategory('books')}
      className={category === 'books'? 'active': ''}
      type="secondary"
      >
      Books
    </FlatButton>
    <FlatButton
      onMouseDown={() => selectCategory('digital-archives')}
      className={category === 'digital-archives'? 'active': ''}
      type="secondary"
      >
      Digital Archives
    </FlatButton>
  </Wrapper>
);
