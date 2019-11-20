import React, { useEffect } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Container, Row, Col } from "reactstrap";
import { replaceStaticUrl } from "./../../../utils/";
import { QuantityEditor } from "./../../commons/";
import LineItem from "./LineItem";

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

const APPLY_DISCOUNT = gql`
  query getSubscriptionDiscount{
    getSubscriptionDiscount{
      discountAmount
      totalPrice{
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
  }
`;

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
  guestEditVariantQuantity,
  guestRemoveVariantQuantity,
  setDiscount,
  history: {
    push
  } = {},
}) => {

  useEffect(() => {
    client.query({
      query: APPLY_DISCOUNT
    }).then(({data: { getSubscriptionDiscount }, loading}) => {
      if(!loading) {
        setDiscount(getSubscriptionDiscount)
      }
    });
  }, [lines]);

  const getQuantityFromLines = lines =>
    lines.reduce((acc, line) => acc + line.quantity, 0);

  const modifyQuantityForCheckout = (id, quantity) => {
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
            checkoutLinesUpdate: {
              checkout: { lines, totalPrice, subtotalPrice } = {}
            },
            errors
          }
        } = {}) => {
          if (!errors || errors.length === 0) {
            setLineQuantity({ id, quantity });
            const line = lines.find(({ id: lineId }) => id === lineId);
            if (line) {
              updateCartLineTotalPrice(id, line.totalPrice);
            }
            updateCartQuantity(getQuantityFromLines(lines));
            updateCartTotalPrice(totalPrice);
            updateCartSubTotalPrice(subtotalPrice);
            return;
          }
        }
      );
  };
  const modifyQuantity = id => {
    return quantity => {
      if (checkoutId) {
        return modifyQuantityForCheckout(id, quantity);
      } else {
        return new Promise((resolve, reject) => {
          guestEditVariantQuantity(id, quantity);
          resolve();
        });
      }
    };
  };

  const deleteLineItem = lineId => {
    if(!checkoutId) {
      return guestRemoveVariantQuantity(lineId)
    }
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
            updateCartTotalPrice(totalPrice);
            updateCartSubTotalPrice(subtotalPrice);
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
                totalPrice: { gross: { localized } = {} } = {},
                variant: {
                  id: variantId,
                  isDigital,
                  sku,
                  product: {
                    id: productId,
                    name,
                    images,
                    thumbnail: { url: thumbnailUrl } = {}
                  } = {}
                } = {}
              }) => (
                  <LineItem
                    id={id}
                    quantity={quantity}
                    localized={localized}
                    variantId={variantId}
                    isDigital={isDigital}
                    sku={sku}
                    productId={productId}
                    name={name}
                    images={images}
                    thumbnailUrl={thumbnailUrl}
                    modifyQuantity={modifyQuantity}
                    deleteLineItem={deleteLineItem}
                    push={push}
                  />
              )
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Checkout;
