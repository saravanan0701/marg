import React, { Component } from 'react';
import styled from 'styled-components';

import { Query } from "react-apollo";
import gql from 'graphql-tag';
import ReactHtmlParser from 'react-html-parser';
import { RaisedButton, RadioButtonSet } from './../commons/';
import FontAwesome from 'react-fontawesome';
import { replaceStaticUrl, getEditorName } from './../../utils/';
import { Container, Row, Col } from 'reactstrap';
import Article from './../Article';

const Wrapper = styled.div`

  @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
    padding: 50px 100px 100px;
  }

  .img-fluid {
    width: 100%;
  }

  .name {
    font-family: "Cormorant Garamond Medium";
    font-size: ${props => props.theme['$font-size-sm']};
    line-height: ${props => props.theme['$font-size-sm']};
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      font-size: ${props => props.theme['$font-size-lg']};
      line-height: ${props => props.theme['$font-size-lg']};
    }
    font-weight: ${props => props.theme['$weight-regular']};
    font-weight: 500;
    letter-spacing: 1px;
    margin-top: 20px;
    margin-bottom: 50px;
  }

  .product-type {
    font-family: "Cormorant Garamond Medium";
    font-size: ${props => props.theme['$font-size-sm']};
    line-height: ${props => props.theme['$font-size-sm']};
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      font-size: ${props => props.theme['$font-size-lg']};
      line-height: ${props => props.theme['$font-size-lg']};
    }
    font-weight: ${props => props.theme['$weight-regular']};
    font-weight: 500;
    letter-spacing: 1px;
  }

  .editor-name {
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 1px;
    line-height: 28px;
    margin-bottom: 1.5rem;
  }

  .medium-name {
    color: #37312f;
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    line-height: 20px;
    margin-right: 3rem;
  }

  .pricing {
    color: #37312f;
    font-family: ${props => props.theme['$font-primary-medium']};
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    line-height: 20px;
  }

  .add-to-bag {
    margin: 1.5rem 0;
    align-self: flex-start;
  }

  .availability {
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 0.59px;
    line-height: 23px;
  }

  h3#description {
    color: #37312f;
    font-family: Lato;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .contents {
    /* width: 80%;
    max-width: 80%; */
    & > .heading {
      font-family: "Cormorant Garamond Medium";
      font-size: ${props => props.theme['$font-size-sm']};
      @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
        font-size: ${props => props.theme['$font-size-lg']};
      }
      font-weight: ${props => props.theme['$weight-regular']};
      /* padding-bottom: 60px; */
      color: ${props => props.theme.mainTextColor};
    }

    & > div:not(.heading) {
      border-top: 1px solid #9d9d9d;
    }

    & > div:last-child {
      border-bottom: 1px solid #9d9d9d;
    }
  }
`;

const OutOfStock = styled.div`
  color: ${props => props.theme.primaryColor};
  font-size: ${props => props.theme['$font-size-xs']};
  font-weight: ${props => props.theme['$weight-regular']};
`;

const LOAD_PRODUCT = gql`
  query LoadProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      volumeInfo
      isAvailable
      category{
        name
      }
      images{
        url
      }
      thumbnail{
        url
      }
      attributes{
        value{
          id
          name
          value
          slug
        }
        attribute{
          id
          name
          slug
        }
      }
      editors{
        id
        name
      }
      sections{
        childProducts{
          id
          name
          description
          isAvailable
          price{
            currency
            amount
          }
          editors {
            id
            name
          }
          variants{
            id
            isDigital
            pricing{
              price{
                gross{
                  currency
                  amount
                }
              }
            }
          }
        }
      }
      variants{
        id
        isDigital
        pricing{
          price{
            gross{
              currency
              amount
            }
          }
        }
      }
    }
  }
`
const DEFAULT_QUANTITY = 1;


const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: ${props => props.theme['$font-size-xxxs']};
  font-weight: ${props => props.theme['$weight-bold']};
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${props => props.theme.underlineColor};
  
  & > .name {
    width: 40%;
  }

  & > .price {

  }
`

const ProductDetails = ({
  match: {
    params: {
      id,
    }
  },
  saveVariant,
  client
}) => {

  let selectedVariant = {};

  return <Wrapper>
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
              volumeInfo,
              description,
              images,
              isAvailable,
              editors,
              sections,
              variants = [],
              attributes,
              category,
              thumbnail: {
                url: thumbnailUrl,
              } = {},
            } = {},
          },
        }) => {
          if (loading) {
            return <h1>Loading...</h1>;
          }

          const metaInfo = attributes.reduce((acc, {value, attribute} = {} ) => {
            acc[attribute.slug]=value.name
            return acc;
          }, {})

          const singularCategoryName = category && category.name && category.name.replace(/s/gi, '');
          const artilesShouldBePurchasable = singularCategoryName === "Magazine"? true: false;
          {/*console.log("artilesShouldBePurchasable: ", artilesShouldBePurchasable)*/}

          const childProducts = sections.reduce((acc, section) => acc.concat(section.childProducts), []);
          return (

            <Container>
              <Row className="my-5">
                <Col className="text-lg-center" lg="6">
                  <img
                    className="img-fluid"
                    src={replaceStaticUrl(images && images.length > 0? images[0].url: thumbnailUrl)}
                  />
                </Col>
                <Col className="details" lg="6">
                  <div className="product-type">{singularCategoryName}</div>
                  <div className="row m-0">
                    {
                      volumeInfo &&
                      <div>{volumeInfo}</div>
                    }
                    {
                      volumeInfo && metaInfo && metaInfo.year &&
                      <div>,&nbsp;</div>
                    }
                    {
                      metaInfo && metaInfo.year &&
                      <div>{metaInfo.year}</div>
                    }
                  </div>
                  <div className="name">{name}</div>
                  {
                    getEditorName(editors) && 
                      <div className="editor-name">Edited by:&nbsp;{getEditorName(editors)}</div>
                  }
                  {
                    !isAvailable &&
                      <OutOfStock>Out of stock</OutOfStock>
                  }
                  {
                    isAvailable &&
                    <div>
                    <RadioButtonSet
                      selectOption={(id) => {
                        selectedVariant = {
                          ...variants[id]
                        };
                      }
                      }
                      className="pricing"
                      >
                        {
                          variants.map(
                            ({
                              id,
                              isDigital,
                              pricing: {
                                price: {
                                  gross: {
                                    currency,
                                    amount,
                                  },
                                },
                              },
                            }) => (
                                <PriceWrapper key={id}>
                                  {
                                    isDigital ?
                                      <div className="medium-name">Digital</div>
                                      :
                                      <div className="medium-name">Print</div>
                                  }
                                  <div className="price">{currency}&nbsp;{amount}</div>
                                </PriceWrapper>
                              )
                          )
                        }
                      </RadioButtonSet>
                      <RaisedButton
                        onClick={
                          () => saveVariant({
                            variant: selectedVariant,
                            quantity: DEFAULT_QUANTITY,
                          })
                        }
                        className="add-to-bag"
                      >
                        Add to bag
                      </RaisedButton>
                      <div className="availability">Available to ship within 2 business days</div>
                    </div>
                  }
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <h3 id="description">Description</h3>
                  {ReactHtmlParser(description)}
                </Col>
              </Row>
              <Row>
                <Col lg="9" className="px-0">
                  <div className="contents">
                    {
                      childProducts && childProducts.length > 0 &&
                      <div key="heading" className="heading my-3">Contents</div>
                    }
                    {
                      childProducts.map(
                        (product) => <Article saveVariant={saveVariant} key={product.id} {...product} />
                      )
                    }
                  </div>
                </Col>
              </Row>
              <div className="product-details d-none">
                <div className="details">
                  <div className="image-container">
                    <img
                      src={replaceStaticUrl(images && images.length > 0? images[0].url: thumbnailUrl)}
                    />
                  </div>
                  <div className="details">
                    <div className="name">{name}</div>
                    <div className="editor-name">Edited by:&nbsp;{getEditorName(editors)}</div>
                    <div className="my-4">
                      <RadioButtonSet
                        selectOption={(id) => {
                          selectedVariant = {
                            ...variants[id]
                          };
                        }
                        }
                        className="pricing"
                      >
                        {
                          variants.map(
                            ({
                              id,
                              isDigital,
                              pricing: {
                                price: {
                                  gross: {
                                    currency,
                                    amount,
                                  },
                                },
                              },
                            }) => (
                                <PriceWrapper key={id}>
                                  {
                                    isDigital ?
                                      <div className="name">Digital</div>
                                      :
                                      <div className="name">Print</div>
                                  }
                                  <div className="price">{currency}&nbsp;{amount}</div>
                                </PriceWrapper>
                              )
                          )
                        }
                      </RadioButtonSet>
                    </div>

                    <RaisedButton
                      onClick={
                        () => saveVariant({
                          variant: selectedVariant,
                          quantity: DEFAULT_QUANTITY,
                        })
                      }
                      className="add-to-bag"
                    >
                      Add to bag
                  </RaisedButton>
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
                  {
                    childProducts.map(
                      (product) => {
                        console.log("Reding,,,,,")
                        product.artilesShouldBePurchasable = true;
                        return <Article
                          key={product.id}
                          saveVariant={saveVariant}
                          {
                            ...product
                          }
                        />
                      }
                    )
                  }
                </div>
              </div>

            </Container>
          )
        }
      }
    </Query>
  </Wrapper>
};

export default ProductDetails;