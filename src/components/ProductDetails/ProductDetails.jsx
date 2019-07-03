import React, { Component } from 'react';
import styled from 'styled-components';

import { Query } from "react-apollo";
import gql from 'graphql-tag';
import ReactHtmlParser from 'react-html-parser';
import { RaisedButton } from './../commons/';
import FontAwesome from 'react-fontawesome';

const URI = `${process.env.REACT_APP_BACKEND_URL}/`;

const Wrapper = styled.div`
  padding: 50px 100px 100px;

  & > .product-details {
    
    display: flex;
    flex-direction: column;

    & > .details{
      display: flex;
      flex-direction: row;
      min-height: 80vh;
      height: 80vh;

      & > .image-container {
        width: 60%;

        & > img {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }

      & > .details {
        width: 40%;
        display: flex;
        flex-direction: column;

        & > .name {
          font-family: "Cormorant Garamond Medium";
          font-size: ${props => props.theme['$font-size-lg']};
          font-weight: ${props => props.theme['$weight-regular']};
          font-size: 42px;
          font-weight: 500;
          letter-spacing: 1px;
          line-height: 57px;
        }

        & > .editor-name {
          font-size: ${props => props.theme['$font-size-xxs']};
          font-weight: ${props => props.theme['$weight-regular']};
          letter-spacing: 1px;
          line-height: 28px;
          padding-bottom: 45px;
        }

        & > .price {
          color: #37312f;
          font-family: ${props => props.theme['$font-primary-medium']};
          font-size: ${props => props.theme['$font-size-xs']};
          font-weight: ${props => props.theme['$weight-regular']};
          padding-bottom: 20px;
        }

        & > .add-to-bag {
          align-self: flex-start;
          margin-bottom: 20px;
        }

        & > .availability {
          font-size: ${props => props.theme['$font-size-xxs']};
          font-weight: ${props => props.theme['$weight-regular']};
          letter-spacing: 0.59px;
          line-height: 23px;
        }
      }
    }

    & > .description {

      padding-top: 50px;
      width: 60%;
      max-width: 60%;
      margin-bottom: 100px;

      & > .label {
        color: #37312f;
        font-family: Lato;
        font-size: ${props => props.theme['$font-size-xxs']};
        font-weight: ${props => props.theme['$weight-bold']};
        letter-spacing: 2px;
        text-transform: uppercase;
      }

    }

    & > .contents {

      width: 80%;
      max-width: 80%;


      & > .heading {
        font-family: "Cormorant Garamond Medium";
        font-size: ${props => props.theme['$font-size-lg']};
        font-weight: ${props => props.theme['$weight-regular']};
        padding-bottom: 60px;
        color: ${props => props.theme.mainTextColor};
      }

      & > div:not(.heading) {
        border-top: 1px solid #9d9d9d;
      }

      & > div:last-child {
        border-bottom: 1px solid #9d9d9d;
      }
    }
  }
`;

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  & > div.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 0px 15px;

    & > div.title {
      width: 90%;
      max-width: 90%;
      display: flex;
      flex-direction: column;

      & > div.product-title {
        font-size: ${props => props.theme['$font-size-xs']};
        font-weight: ${props => props.theme['$weight-bold']};
        letter-spacing: 0.66px;
        line-height: 23px;
        color: ${props => props.theme.mainTextColor};
      }

      & > div.product-editor {
        font-size: ${props => props.theme['$font-size-xxxs']};
        font-weight: ${props => props.theme['$weight-bold']};
        color: ${props => props.theme.underlineColor};
        letter-spacing: 1px;
      }
    }

    & > div.price {
      width: 5%;
      max-width: 5%;
      text-align: center;
      font-family: ${props => props.theme['$font-primary-medium']};
      color: ${props => props.theme.underlineColor};
      font-size: ${props => props.theme['$font-size-xxs']};
      font-weight: ${props => props.theme['$weight-regular']};
    }

    & > div.icon {
      color: ${props => props.theme.primaryColor};
    }

  }
`;

const LOAD_PRODUCT = gql`
  query LoadProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      pricing{
        priceRange{
          start{
            gross{
              amount
            }
          }
          stop{
            gross{
              amount
            }
          }
        }
      }
      images{
        url
      }
      thumbnail{
        url
      }
      attributes{
        attribute{
          id
          name
          slug
          values{
            id
            name
            slug
          }
        }
      }
      editors{
        id
        firstName
        lastName
      }
      sections{
        childProducts{
          id
          name
          description
          pricing{
            priceRange{
              start{
                gross{
                  amount
                }
              }
              stop{
                gross{
                  amount
                }
              }
            }
          }
          editors {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`

const replaceStaticUrl = (url) => (
  [
    {
      key: 'http://backend/',
      value: URI,
    },
    {
      key: 'static',
      value: 'backend-static',
    },
    {
      key: 'media',
      value: 'backend-media',
    },
  ].reduce((url, it) => url.replace(it.key, it.value), url)
)

const getEditorName = (editors) => (
  editors
    .map(({id, firstName, lastName}) => (`${firstName} ${lastName}`))
    .join(',')
);

const Article = ({
  name,
  editors
}) => (
  <ArticleWrapper>
    <div className="header">
      <div className="title">
        <div className="product-title">
          {name}
        </div>
        <div className="product-editor">
          {getEditorName(editors)}
        </div>
      </div>
      <div className="price">
        80
      </div>
      <div className="icon">
        <FontAwesome name='chevron-down'/>
      </div>

    </div>
  </ArticleWrapper>
);

const ProductDetails = ({
  match: {
    params: {
      id,
    }
  }
}) => (
  <Wrapper>
    <Query
      query={LOAD_PRODUCT}
      variables={{
        id,
      }}>
      {
        ({
          loading,
          error,
          data: {
            product: {
              id: productId,
              name,
              description,
              images,
              thumbnail: {
                url: thumbnailUrl
              } = {},
              attributes,
              editors,
              sections,
            } = {},
          },
        }) => {
          const productVariants = {};
          if(loading) {
            return <h1>Loading...</h1>;
          }
          const childProducts = sections.reduce((acc, section) => acc.concat(section.childProducts), []);
          return (
            <div className="product-details">
              <div className="details">
                <div className="image-container">
                  <img
                    src={images && images.length > 0? replaceStaticUrl(images[0].url): replaceStaticUrl(thumbnailUrl)}
                    />
                </div>
                <div className="details">
                  <div className="name">{name}</div>
                  <div className="editor-name">Edited by:&nbsp;{getEditorName(editors)}</div>
                  <div className="price">Rs. 1,380</div>
                  <RaisedButton className="add-to-bag">Add to bag</RaisedButton>
                  <div className="availability">Available to ship within 2 business days</div>
                </div>
              </div>
              <div className="description">
                <div className="label">Description</div>
                {ReactHtmlParser(description)}
              </div>
              <div className="contents">
                {
                  childProducts && childProducts.length > 0 &&
                    <div key="heading" className="heading">Contents</div>
                }
                {childProducts.map((product) => <Article key={product.id} {...product} />)}
              </div>
            </div> 
          )
        }
      }
    </Query>
  </Wrapper>
);

export default ProductDetails;