import React, { Component } from "react";
import styled from "styled-components";
import ReactGA from 'react-ga';

import { Redirect } from "react-router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ReactHtmlParser from "react-html-parser";
import { RaisedButton, RadioButtonSet, FlatButton } from "./../commons/";
import FontAwesome from "react-fontawesome";
import {
  replaceStaticUrl,
  getEditorName,
  getLocalizedAmount
} from "./../../utils/";
import { Container, Row, Col } from "reactstrap";
import Article from "./../Article";

const Wrapper = styled.div`
  @media (min-width: ${props => props.theme["mobileBreakpoint"]}) {
    padding: 50px 100px 100px;
  }

  .img-fluid {
    width: 100%;
  }

  .name {
    font-family: ${props => props.theme["$font-secondary-medium"]};
    font-size: ${props => props.theme["$font-size-sm"]};
    line-height: ${props => props.theme["$font-size-sm"]};
    @media (min-width: ${props => props.theme["mobileBreakpoint"]}) {
      font-size: ${props => props.theme["$font-size-lg"]};
      line-height: ${props => props.theme["$font-size-lg"]};
    }
    font-weight: ${props => props.theme["$weight-regular"]};
    font-weight: 500;
    letter-spacing: 1px;
  }

  .product-type {
    color: #37312f;
    font-family: Lato;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .current-issue {
    padding-left: 20px;
    color: ${props => props.theme.primaryColor};
    font-family: Lato;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 2.5px;
    text-transform: uppercase;
  }

  .editor-name {
    font-size: ${props => props.theme["$font-size-xxs"]};
    font-weight: ${props => props.theme["$weight-regular"]};
    letter-spacing: 1px;
    line-height: 28px;
    margin-bottom: 1.5rem;
  }

  .medium-name {
    color: #37312f;
    font-size: ${props => props.theme["$font-size-xxs"]};
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    line-height: 20px;
    margin-right: 3rem;
  }

  .pricing {
    color: #37312f;
    font-family: ${props => props.theme["$font-primary-medium"]};
    font-size: ${props => props.theme["$font-size-xxs"]};
    font-weight: ${props => props.theme["$weight-regular"]};
    line-height: 20px;
  }

  .add-to-bag {
    margin: 1.5rem 0;
    align-self: flex-start;
  }

  .availability {
    font-size: ${props => props.theme["$font-size-xxs"]};
    font-weight: ${props => props.theme["$weight-regular"]};
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
    & > .heading {
      font-family: ${props => props.theme["$font-secondary-medium"]};
      font-size: ${props => props.theme["$font-size-sm"]};
      @media (min-width: ${props => props.theme["mobileBreakpoint"]}) {
        font-size: ${props => props.theme["$font-size-lg"]};
      }
      font-weight: ${props => props.theme["$weight-regular"]};
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
  font-size: ${props => props.theme["$font-size-xs"]};
  font-weight: ${props => props.theme["$weight-regular"]};
`;

const PRODUCT_QUERY = `
  product(id: $id) {
    id
    name
    description
    volumeInfo
    isAvailable
    isCurrenctIssue
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
        editors {
          id
          name
        }
        pageNumber
        order
        variants{
          id
          isDigital
          inrPrice {
            amount
            currency
            localized
          }
          usdPrice {
            amount
            currency
            localized
          }
        }
      }
    }
    variants{
      id
      isDigital
      inrPrice {
        amount
        currency
        localized
      }
      usdPrice {
        amount
        currency
        localized
      }
    }
  }
`;

const ME_QUERY = `
  me{
    orders(first:10, productId: $id){
      edges{
        node{
          id
          lines{
            id
            variant{
              id
              isDigital
            }
          }
        }
      }
    }
  }
`;

const LOAD_PRODUCT_AND_ORDERS = gql`
  query LoadProduct($id: ID!) {
    ${PRODUCT_QUERY}
    ${ME_QUERY}
  }
`;
const LOAD_PRODUCT = gql`
  query LoadProduct($id: ID!) {
    ${PRODUCT_QUERY}
  }
`;
const DEFAULT_QUANTITY = 1;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: ${props => props.theme["$font-size-xxxs"]};
  font-weight: ${props => props.theme["$weight-bold"]};
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${props => props.theme.underlineColor};

  & > .name {
    width: 40%;
  }
`;

const ProductDetails = ({
  match: {
    params: { id }
  },
  saveVariant,
  currency,
  isLoggedIn,
  subscriptions,
}) => {
  let selectedVariant = {};

  return (
    <Wrapper>
      <Query
        query={isLoggedIn ? LOAD_PRODUCT_AND_ORDERS : LOAD_PRODUCT}
        variables={{
          id
        }}
      >
        {({ loading, error, data: { me = {}, product } = {} }) => {
          if (loading) {
            return <h1>Loading...</h1>;
          }
          if (!loading && !product) {
            return <Redirect to="/404" />;
          }

          const {
            id: productId,
            name,
            volumeInfo,
            description,
            isCurrenctIssue: isCurrentIssue,
            images,
            isAvailable,
            editors,
            sections,
            variants = [],
            attributes,
            category,
            thumbnail: { url: thumbnailUrl } = {}
          } = product || {};

          const { orders: { edges: orderEdges } = {} } = me || {};

          const currentUserSubscription = subscriptions.find((subIt) => {
            if(subIt.subscription.categoryType.toLowerCase().match(category.name.toLowerCase())) {
              return false;
            }
            if(subIt.subscription.issueType === "ALL_ISSUES") {
              return true;
            }
            if(subIt.subscription.issueType !== "ALL_ISSUES" && !isCurrentIssue) {
              return false;
            }
            return true;
          });

          let productVariants;
          if (orderEdges) {
            productVariants = variants.map(variant => {
              const foundVar = orderEdges.reduce((acc, order) => {
                const foundLine = order.node.lines.find(
                  ({ variant: lineVariant }) => {
                    return lineVariant.id === variant.id && variant.isDigital;
                  }
                );
                if (foundLine && !acc) {
                  return {
                    ...variant,
                    alreadyBought: true,
                    url: `/reader/?order-id=${order.node.id}&line-id=${foundLine.id}`
                  };
                }
                return acc;
              }, null);
              if(currentUserSubscription && ["DIGITAL", "PRINT_AND_DIGITAL"].find(
                  (it) => it === currentUserSubscription.subscription.variantType
                )) {
                return variant.isDigital? {
                  ...variant,
                  alreadyBought: true,
                  url: `/reader/?user-subscription-id=${currentUserSubscription.id}&variant-id=${variant.id}`
                }: variant;
              }
              return foundVar ? foundVar : variant;
            });
          } else {
            productVariants = variants;
          }

          const boughtVar = productVariants.find(
            ({ alreadyBought }) => alreadyBought
          );
          const unboughtVariants = productVariants.reduce(
            (acc, it) => (it.alreadyBought ? acc : acc.concat(it)),
            []
          );

          const metaInfo = attributes.reduce(
            (acc, { value, attribute } = {}) => {
              acc[attribute.slug] = value.name;
              return acc;
            },
            {}
          );

          const singularCategoryName =
            category && category.name && category.name.replace(/s/gi, "");
          const articlesShouldBePurchasable =
            singularCategoryName === "Magazine" ? true : false;

          const childProducts = sections
            .reduce((acc, section) => acc.concat(section.childProducts), [])
            .sort(({ order: orderA }, { order: orderB }) => orderA - orderB);

          return (
            <Container>
              <Row className="my-5">
                <Col className="text-lg-center" lg="6">
                  <img
                    className="img-fluid"
                    src={replaceStaticUrl(
                      images && images.length > 0 ? images[0].url : thumbnailUrl
                    )}
                  />
                </Col>
                <Col className="details" lg="6">
                  <div className="d-flex mt-3 mt-lg-0 ml-0">
                    <div className="product-type ">{singularCategoryName}</div>
                    <div className="current-issue">
                      {isCurrentIssue ? "CURRENT ISSUE" : ""}
                    </div>
                  </div>
                  <div className="d-flex mt-1">
                    {volumeInfo && <div>{volumeInfo}</div>}
                    {volumeInfo && metaInfo && metaInfo.year && (
                      <div>,&nbsp;</div>
                    )}
                    {metaInfo && metaInfo.year && <div>{metaInfo.year}</div>}
                  </div>
                  <h1 className="name my-3">{name}</h1>
                  {getEditorName(editors) && (
                    <div className="editor-name">
                      Edited by:&nbsp;{getEditorName(editors)}
                    </div>
                  )}
                  {!isAvailable && <OutOfStock>Out of stock</OutOfStock>}
                  {boughtVar && (
                    <FlatButton
                      onClick={e =>
                        window.open(
                          boughtVar.url,
                          "_blank"
                        )
                      }
                      className={`${boughtVar ? "mt-3 mt-lg-5" : ""}`}
                    >
                      Digital: Read now
                    </FlatButton>
                  )}
                  {isAvailable && (
                    <div className={`${!boughtVar ? "my-3 my-lg-5" : "mt-3"}`}>
                      <RadioButtonSet
                        selectedId={unboughtVariants.findIndex(
                          variant => !variant.alreadyBought
                        )}
                        selectOption={id => {
                          selectedVariant = {
                            ...unboughtVariants[id]
                          };
                        }}
                        className="pricing"
                      >
                        {unboughtVariants.reduce(
                          (
                            acc,
                            {
                              id,
                              isDigital,
                              inrPrice: { localized: localizedInr } = {},
                              usdPrice: { localized: localizedUsd } = {},
                              alreadyBought
                            }
                          ) => {
                            if (alreadyBought) {
                              return acc;
                            }
                            return acc.concat(
                              <PriceWrapper key={id}>
                                {isDigital ? (
                                  <div className="medium-name">Digital</div>
                                ) : (
                                  <div className="medium-name">Print</div>
                                )}
                                <div className="price">
                                  {getLocalizedAmount({
                                    currency,
                                    inr: localizedInr,
                                    usd: localizedUsd
                                  })}
                                </div>
                              </PriceWrapper>
                            );
                          },
                          []
                        )}
                      </RadioButtonSet>
                      <RaisedButton
                        onClick={() => {
                          let label = name.concat(" - ").concat(selectedVariant.isDigital ? 'Digital' : 'Print');
                          ReactGA.event({
                            category: 'E-Commerce Action',
                            action: 'Added Item to Cart',
                            label: label
                          });
                          saveVariant({
                            variant: {
                              ...selectedVariant,
                              product: {
                                id,
                                name,
                                images,
                                thumbnailUrl
                              }
                            },
                            quantity: DEFAULT_QUANTITY
                          });
                        }}
                        className="add-to-bag"
                      >
                        Add To Cart
                      </RaisedButton>
                    </div>
                  )}
                </Col>
              </Row>
              <Row>
                {(!category || category.name === "Books") && (
                  <Col lg="6">
                    <h3 id="description">Description</h3>
                    {ReactHtmlParser(description)}
                  </Col>
                )}
              </Row>
              <Row>
                <Col lg="9" className="px-0">
                  <div className="contents">
                    {childProducts && childProducts.length > 0 && (
                      <h3 key="heading" className="heading my-3 my-5 text-left">
                        Contents
                      </h3>
                    )}
                    {childProducts.map(product => (
                      <Article
                        showParentInfo={false}
                        saveVariant={saveVariant}
                        key={product.id}
                        purchasable={articlesShouldBePurchasable}
                        {...product}
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </Container>
          );
        }}
      </Query>
    </Wrapper>
  );
};

export default ProductDetails;
