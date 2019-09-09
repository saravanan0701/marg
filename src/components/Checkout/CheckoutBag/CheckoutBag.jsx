import React from "react";
import { Link, Route } from "react-router-dom";
import styled from "styled-components";
import FontAwesome from "react-fontawesome";
import gql from "graphql-tag";
import { Container, Row, Col } from "reactstrap";
import { replaceStaticUrl } from "./../../../utils/";
import CheckoutSidebar from '../CheckoutSidebar/';
import {
  RaisedButton,
  QuantityEditor,
  CollapseContainer
} from "./../../commons/";

const ImgContainer = styled.div`
  img {
    height: 256px;
  }
`;

const NameContainer = styled.div`
  .main-name {
    color: #000000;
    font-family: Lato;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.66px;
    line-height: 23px;
  }

  .sub-heading {
    color: #3a3a3a;
    font-family: Lato;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.59px;
    line-height: 23px;
  }

  .delete-item {
    cursor: pointer;
    color: #ec1d24;
    font-family: Lato;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.7px;
    line-height: 34px;
    text-transform: uppercase;
  }
`;

const LinePrice = styled.div`
  text-align: right;
  color: #000000;
  font-family: Lato;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.66px;
  line-height: 23px;
`;

const PriceContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: ${props => props.theme.underlineColor} solid 1px;
  & > div.price-details {
    text-align: right;
  }
`;

const ActionButton = styled.div`
  padding-bottom: 10px;
  & > .button-wrapper {
    padding-right: 0px;
  }
`;

const OrderLine = styled.div`
  border-bottom: 1px solid #9d9d9d;
`;

const UPDATE_QUANTITY = gql(`
  mutation UpdateQuantity(
    $checkoutId: ID!,
    $lines: [CheckoutLineInput]!,
  ) {
    checkoutLinesUpdate(
      checkoutId: $checkoutId,
      lines: $lines
    ) {
      checkout{
        quantity
        lines{
          id
          quantity
          totalPrice{
            net{
              currency
              amount
              localized
            }
            gross{
              currency
              amount
              localized
            }
          }
        }
        totalPrice{
          net{
            currency
            amount
            localized
          }
          gross{
            currency
            amount
            localized
          }
        }
        subtotalPrice{
          gross{
            currency
            amount
            localized
          }
          net{
            currency
            amount
            localized
          }
        }
      }
      errors{
        message
        field
      }
    }
  }
`);

const DELETE_LINE = gql(`
  mutation UpdateQuantity(
    $checkoutId: ID!,
    $lineId: ID!,
  ) {
    checkoutLineDelete(
      checkoutId: $checkoutId,
      lineId: $lineId
    ) {
      checkout{
        id
        lines{
          id
          quantity
        }
        totalPrice{
          net{
            currency
            amount
            localized
          }
          gross{
            currency
            amount
            localized
          }
        }
        subtotalPrice{
          gross{
            currency
            amount
            localized
          }
          net{
            currency
            amount
            localized
          }
        }
      }
      errors{
        message
        field
      }
    }
  }
`);

const Checkout = ({
  cart: {
    checkoutId,
    lines,
    totalPrice: { gross: { localized } = {} } = {}
  } = {},
  currency,
  client,
  setLineQuantity,
  updateCartQuantity,
  removeLineItem,
  updateCartTotalPrice,
  updateCartSubTotalPrice,
  updateCartLineTotalPrice,
}) => {
  const getQuantityFromLines = lines =>
    lines.reduce((acc, line) => acc + line.quantity, 0);
  const modifyQuantity = id => {
    return quantity => {
      return client
        .mutate({
          mutation: UPDATE_QUANTITY,
          variables: {
            checkoutId,
            lines: lines.map(
              ({
                id: lineId,
                quantity: lineQuantity,
                variant: { id: variantId } = {}
              }) => {
                if (lineId === id) {
                  return {
                    quantity,
                    variantId
                  };
                }
                return {
                  variantId,
                  quantity: lineQuantity
                };
              }
            )
          }
        })
        .then(
          ({
            data: {
              checkoutLinesUpdate: { checkout: { lines, totalPrice, subtotalPrice  } = {} },
              errors
            }
          } = {}) => {
            if(!errors || errors.length === 0) {
              setLineQuantity({ id, quantity });
              const line = lines.find(({id: lineId}) => id === lineId);
              if(line) {
                updateCartLineTotalPrice(id, line.totalPrice);
              }
              updateCartQuantity(getQuantityFromLines(lines));
              updateCartTotalPrice(totalPrice)
              updateCartSubTotalPrice(subtotalPrice)
              return;
            }
          }
        );
    };
  };

  const deleteLineItem = lineId => {
    client
      .mutate({
        mutation: DELETE_LINE,
        variables: {
          checkoutId,
          lineId
        }
      })
      .then(
        ({
          data: {
            checkoutLineDelete: {
              checkout: { lines, totalPrice, subtotalPrice }
            },
            errors
          }
        }) => {
          if (!errors || errors.length === 0) {
            removeLineItem(lineId);
            updateCartQuantity(getQuantityFromLines(lines));
            updateCartTotalPrice(totalPrice)
            updateCartSubTotalPrice(subtotalPrice)
          }
        }
      );
  };

  return (
    <Container>
      {lines && lines.length === 0 && <h3>No products in cart</h3>}
      {lines && lines.length > 0 && (
        <Row className="px-lg-5">
          <Col xs="12">
            {lines.map(
              ({
                id,
                quantity,
                totalPrice: {
                  gross: { localized } = {}
                } = {},
                variant: {
                  isDigital,
                  sku,
                  inrPrice: {
                    localized: inrLocalized,
                  },
                  usdPrice: {
                    localized: usdLocalized,
                  },
                  product: {
                    name,
                    images,
                    thumbnail: {
                      url: thumbnailUrl
                    } = {}
                  } = {}
                } = {}
              }) => (
                <OrderLine key={sku} className="row py-4">
                  <Col xs="4">
                    <ImgContainer className="text-right">
                      <img src={replaceStaticUrl(images && images.length > 0? images[0].url: thumbnailUrl)} />
                    </ImgContainer>
                  </Col>
                  <Col xs="6">
                    <NameContainer>
                      <div className="name-placeholder">
                        <div className="main-name my-2">{name}</div>
                      </div>
                      <div className="sub-heading">
                        <span>Type: </span>
                        <span>
                          {isDigital ? (
                            <span>Digital</span>
                          ) : (
                            <span>Print</span>
                          )}
                        </span>
                      </div>

                      {quantity > 0 && (
                        <span className="delete-item" onClick={(e) => deleteLineItem(id)}>REMOVE THIS ITEM</span>
                      )}
                    </NameContainer>
                  </Col>
                  <Col
                    xs="2"
                    className="align-items-center align-items-md-start justify-content-end"
                  >
                    <LinePrice className="mb-3">
                      <span className="price">
                        {
                          (
                            () => {
                              // This block displays prices for logged-in user and guest user.
                              if(localized)
                                return localized
                              if(currency === "INR") {
                                return inrLocalized
                              } else {
                                return usdLocalized
                              }
                            }
                          )()
                        }
                      </span>
                    </LinePrice>
                    <QuantityEditor
                      quantity={quantity}
                      modifyQuantity={modifyQuantity(id)}
                    />
                  </Col>
                  <hr />
                </OrderLine>
              )
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Checkout;
