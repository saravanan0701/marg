import React, { Component } from 'react';
import styled from 'styled-components';

import { Query } from "react-apollo";
import gql from 'graphql-tag';
import ReactHtmlParser from 'react-html-parser';
import { RaisedButton } from './../commons/';

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

      & > .label {
        color: #37312f;
        font-family: Lato;
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
      }

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
    }
  }
`

const replaceStaticUrl = (url) => {
  const replaceExps = [
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
  ];
  return replaceExps.reduce((url, it) => url.replace(it.key, it.value), url);
}

const getEditorName = (attributes) => (
  attributes.reduce((acc, it) => {
    if(it.attribute && it.attribute.slug == "editor") {
      return acc + it.attribute.values[0].name;
    }
    return acc;
  }, "Edited by: ")
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
            } = {},
          },
        }) => {
          const productVariants = {};
          if(loading) {
            return <h1>Loading...</h1>;
          }
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
                  <div className="editor-name">{getEditorName(attributes)}</div>
                  <div className="price">Rs. 1,380</div>
                  <RaisedButton className="add-to-bag">Add to bag</RaisedButton>
                  <div className="availability">Available to ship within 2 business days</div>
                </div>
              </div>
              <div className="description">
                <div className="label">Description</div>
                {ReactHtmlParser(description)}
              </div>

            </div> 
          )
        }
      }
    </Query>
  </Wrapper>
);

export default ProductDetails;