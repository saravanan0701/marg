import React from 'react'
import { Link, Route } from "react-router-dom"
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { replaceStaticUrl } from './../../../utils/';
import { RaisedButton } from './../../commons/';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;

  & > div.order-line {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;

    & > div.img-container {
      width: 13%;
      max-width: 13%;

      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    & > div.name-container {
      margin-left: 2%;
      width: 70%;
      min-width: 70%;
      display: flex;
      flex-direction: column;

      & > div.name-placeholder {
        display: flex;
        flex-direction: row;
        align-items: center;
        & > div.main-name {
          font-size: ${props => props.theme['$font-size-sm']};
          font-weight: ${props => props.theme['$weight-bold']};
          margin-right: 10px;
        }
        & > div.quantity {
          margin-left: 10px;
          font-size: ${props => props.theme['$font-size-xs']};
          font-weight: ${props => props.theme['$weight-regular']};
        }
      }

      & > div.sub-heading {
        font-size: ${props => props.theme['$font-size-xs']};
        font-weight: ${props => props.theme['$weight-regular']};
        opacity: 0.9;
      }
    }

    & > div.price {
      width: 13%;
      min-width: 13%;
      margin-left: 2%;
      text-align: right;
    }
  }

  & > div.price-container {
    display: flex;
    flex-direction: row;
    border-top: ${props => props.theme.underlineColor} solid 1px;

    & > div.price-details {
      margin-left: 87%;
      width: 13%;
      text-align: right;
    }
  }

  & > div.footer {
    display: flex;
    flex-direction: row;
    padding-top: 40px;

    & > div {
      margin-left: 87%;
      width: 13%;
    }
  }
`;

const Checkout = ({
  cart: {
    checkoutId,
    lines,
    totalPrice: {
      gross: {
        amount,
        currency,
      } = {},
    } = {}
  } = {}
}) => (
  <Wrapper>
    {
      lines.map(
        (
          {
            quantity,
            totalPrice: {
              gross: {
                amount,
                currency,
              },
            },
            variant: {
              sku,
              product: {
                name,
                thumbnail: {
                  url
                },
              }
            }
          }
        ) => (
          <div key={sku} className="order-line">
            <div className="img-container">
              <img src={replaceStaticUrl(url)} />
            </div>
            <div className="name-container">
              <div className="name-placeholder">
                <div className="main-name">
                  {name}
                </div>
                <FontAwesome name="close" />
                <div className="quantity">
                  {quantity}
                </div>
              </div>
              <div className="sub-heading">
                {sku}
              </div>
            </div>
            <div className="price">
              {currency}.&nbsp;{amount}
            </div>
          </div>
        )
      )
    }
    <div className="price-container">
      <div className="price-details">
        {currency}.&nbsp;{amount}
      </div>
    </div>
    <div className="footer">
      <Link to="/checkout/address" className="link button">
        <RaisedButton>Checkout</RaisedButton>
      </Link>
    </div>
  </Wrapper>
)

export default Checkout;