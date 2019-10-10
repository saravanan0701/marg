import React from 'react';
import ProductListFilter from './';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px 20px;
  background-color: ${props => props && props.theme && props.theme.sectionBackground};
  justify-content: space-between;

  & > div.header {
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 0.59px;
    line-height: 23px;
    width: 12%;
    max-width: 12%;
  }

  & > div.dropdown-container {
    width: 88%;
    max-width: 88%;
  }

  & div.dropdown {
    margin-left: 2%;
    width: 20%;
    max-width: 20%;
    max-width: 20%;
  }
`

export const DesktopListFilterComponent = (props) => {
  return <Wrapper className="d-none d-lg-flex">
    <div className="header">Filter By:</div>
    <ProductListFilter className="dropdown-container" style={props => props.articlesIsSelected? 'justify-content: flex-start': 'justify-content: space-between'} {...props} />
  </Wrapper>
}
