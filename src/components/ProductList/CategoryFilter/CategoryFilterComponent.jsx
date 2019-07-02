import React, { Component } from 'react';
import styled from 'styled-components';
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
      <Wrapper>
        <FlatButton
          key="1"
          className={articlesIsNotSelected()? 'active': ''}
          onMouseDown={() => replaceCategoryFilters(this.allCategories)}
          type="secondary"
        >
          Magazines & Books
        </FlatButton>
        <FlatButton
          key="2"
          className={!articlesIsNotSelected()? 'active': ''}
          onMouseDown={() => replaceCategoryFilters(this.articles)}
          type="secondary"
        >
          Articles
        </FlatButton>
      </Wrapper>
    )
  }

}

export default CategoryFilterComponent;