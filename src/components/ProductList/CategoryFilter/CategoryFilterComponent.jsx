import React, { Component } from 'react';
import styled from 'styled-components';
import { FlatButton } from '../../commons';
import { getParamsObjFromString } from './../../../utils/';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 400px;
  
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
      margin: 0 auto;
    }

    &.active {
      border-bottom: 1px solid ${props => props.theme.primaryColor};
    }
  }
`;

class CategoryFilterComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      urlProductType: null,
    }
    this.selectMainPublications = this.selectMainPublications.bind(this);
  }


  componentDidMount() {
    this.updateProductType()
  }

  componentDidUpdate(prevProps, nextProps) {
    if(prevProps.location.search != this.props.location.search) {
      this.updateProductType()
    }
  }

  updateProductType() {
    const {
      categories,
      selectedCategories,
      replaceCategoryFilters,
      location: {
        search
      }
    } = this.props;
    const queryObj = getParamsObjFromString(search);
    const queryKeys = Object.keys(queryObj);
    let urlProductType;
    if(queryKeys.length > 0) {
      if(queryKeys[0] === "product-type") {
        urlProductType = queryObj['product-type'];
        this.setState({
          urlProductType: queryObj['product-type'],
        })
      }
    }

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

    if(urlProductType) {
      return replaceCategoryFilters(categories.filter(({slug}) => slug === urlProductType));
    }

    replaceCategoryFilters(this.allCategories);      
  }

  selectMainPublications() {
    const {
      categories,
      replaceCategoryFilters,
    } = this.props;
    const {
      urlProductType
    } = this.state;
    if(urlProductType) {
      replaceCategoryFilters(categories.filter(({slug}) => slug === urlProductType));
    } else {
      replaceCategoryFilters(this.allCategories);
    }
  }
  
  render() {
  
    const {
      selectedCategories,
      replaceCategoryFilters,
      categories,
    } = this.props;

    const articlesIsNotSelected = () => selectedCategories.filter((category) => category.slug !== 'articles').length > 0

    return (
      <Wrapper className="my-4 mx-auto">
        <FlatButton
          key="1"
          className={articlesIsNotSelected()? 'active': ''}
          onMouseDown={() => this.selectMainPublications()}
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