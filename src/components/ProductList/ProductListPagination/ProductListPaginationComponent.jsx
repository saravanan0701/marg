import React, { Component } from 'react';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';
import { RaisedButton } from './../../commons/';


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px 20px;
  justify-content: center;
  align-items: center;
`
export const ProductListPaginationComponent = ({ hasNextPage, loadNextPage }) => (
  <Wrapper>
    {
      hasNextPage && <RaisedButton onClick={(e) => loadNextPage()}>
        Load More
      </RaisedButton>
    }
  </Wrapper>
)