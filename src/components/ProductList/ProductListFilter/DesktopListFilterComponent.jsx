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
    width: 80px;
    max-width: 12%;
  }

  & > div.dropdown-container {
    width: 100%;
  }

  & > div.dropdown-container.flex-start {
    justify-content: flex-start
  }

  & > div.dropdown-container.space-between {
    justify-content: space-between
  }

  & div.dropdown {
    margin-left: 2%;
    width: 20%;
    max-width: 20%;
    max-width: 20%;
  }
`

export const DesktopListFilterComponent = (props) => {
  return <Wrapper className="d-none d-lg-flex mb-5">
    <div className="header">Filter By:</div>
    <ProductListFilter className={`dropdown-container ${props.articlesIsSelected? 'flex-start': 'space-between'}`} {...props} />
  </Wrapper>
}
