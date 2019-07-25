import React, { Component } from 'react';
import styled from 'styled-components';
import { FlatButton } from '../../commons';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
    justify-content: center;
  }

  @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
    padding-top: 40px;
    padding-bottom: 30px;
  }

  span.link {
    font-size: 14px;
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      font-size: 16px;
    }
  }

  & > div {
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      margin-left: 50px;
    }

    &.active {
      border-bottom: 1px solid ${props => props.theme.primaryColor};
    }
  }
`;

class CategoryFilterComponent extends Component {

  componentDidMount(prevProps, nextProps) {
    const {
      categories,
      selectedCategories,
      replaceCategoryFilters,
    } = this.props;

    this.allCategories = categories.filter((category) => {
      if(category.slug !== "articles") {
        return category;
      }
    });
    

    this.articles = categories.filter((category) => {
      if(category.slug === "articles") {
        return category;
      }
    });

    replaceCategoryFilters(this.allCategories);      
  }
  
  render() {
  
    const {
      selectedCategories,
      replaceCategoryFilters,
      categories,
    } = this.props;

    const articlesIsNotSelected = () => selectedCategories.filter((category) => category.slug !== 'articles').length > 0

    return (
      <Wrapper className="my-4">
        <FlatButton
          key="1"
          className={articlesIsNotSelected()? 'active': ''}
          onMouseDown={() => replaceCategoryFilters(this.allCategories)}
          type="secondary"
        >
          <span className="link">Magazines & Books</span>
        </FlatButton>
        <FlatButton
          key="2"
          className={!articlesIsNotSelected()? 'active': ''}
          onMouseDown={() => replaceCategoryFilters(this.articles)}
          type="secondary"
        >
          <span className="link">Articles</span>
        </FlatButton>
      </Wrapper>
    )
  }

}

export default CategoryFilterComponent;