import React from 'react'
import { Link, Route } from "react-router-dom"
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Container, Row, Col } from 'reactstrap';
import { replaceStaticUrl } from './../../../utils/';
import { RaisedButton } from './../../commons/';


const ImgContainer = styled.div`
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NameContainer = styled.div`
  margin-left: 2%;
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
`;

const LinePrice = styled.div`
  text-align: right;
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
  padding-bottom: 10px
  & > .button-wrapper {
    padding-right: 0px;
  }
`;

const OrderLine = styled.div`
margin-bottom: 10px;
`

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
  <Container>
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
          <OrderLine key={sku} className="row">
            <Col xs='8' sm='10'>
              <Row>
                <Col xs='12' sm='2'>
                  <ImgContainer>
                    <img src={replaceStaticUrl(url)} />
                  </ImgContainer>
                </Col>
                <Col xs='12' sm='10'>
                  <NameContainer>
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
                  </NameContainer>
                </Col>
              </Row>
            </Col>
            <Col xs='4' sm='2' className="row align-items-center align-items-md-start justify-content-end">
              <LinePrice>
                {currency}.&nbsp;{amount}
              </LinePrice>
            </Col>
          </OrderLine>
        )
      )
    }
    <PriceContainer className="row">
      <Col xs="8" sm="10"></Col>
      <Col xs="4" sm="2" className="price-details row align-items-center align-items-md-start justify-content-end">
        {currency}.&nbsp;{amount}
      </Col>
    </PriceContainer>
    <ActionButton className="row">
        <Col sm={{offset:8, size: 4}} className="button-wrapper row justify-content-end">
          <Link to="/checkout/address" className="link button">
            <RaisedButton>Checkout</RaisedButton>
          </Link>
        </Col>
    </ActionButton>
  </Container>
)

export default Checkout;