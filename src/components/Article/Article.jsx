import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import ReactHtmlParser from 'react-html-parser';
import gql from 'graphql-tag';
import { getEditorName, getLocalizedAmount, replaceStaticUrl } from './../../utils/';
import { RaisedButton } from './../commons/';

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  span.fa {
    color: ${props => props.theme['primaryColor']};
    display: block;
  }

  
   div.container {
    border-top: 1px solid #9d9d9d;
   }

  .body {
    display: none;

    & > .cart-info > .out-of-stock {
      text-align: right;
    }

    & > .description {
      & .product-heading {
        color: #37312f;
        font-family: ${props => props.theme['$font-primary-medium']};
        font-size: ${props => props.theme['$font-size-xxs']};
        font-weight: ${props => props.theme['$weight-bold']};
        letter-spacing: 2px;
        text-transform: uppercase;
      }

      & .product-type {
        color: ${props => props.theme['mainTextColor']};
        font-family: ${props => props.theme['$font-primary-medium']};
        font-size: ${props => props.theme['$font-size-xxxs']};
        font-weight: ${props => props.theme['$weight-regular']};
        letter-spacing: 0.52px;
        line-height: 21px;
      }
    }

    & .editor-name {
      font-size: ${props => props.theme['$font-size-xxs']};
      font-weight: ${props => props.theme['$weight-regular']};
      color: ${props => props.theme['mainTextColor']};
      letter-spacing: 1px;
      line-height: 28px;
    }
  }

  .body.isOpen{
    display: flex;
  }

  .hint {
    font-size: 12px;
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      font-size: ${props => props.theme['$font-size-xxxs']};
    }
    font-weight: ${props => props.theme['$weight-regular']};
  }

  .title {
    color: ${props => props.theme['mainTextColor']};
    font-size: ${props => props.theme['$font-size-xxs']};
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      font-size: ${props => props.theme['$font-size-xs']};
    }
    font-weight: ${props => props.theme['$weight-semibold']};
    line-height: 23px;
    color: ${props => props.theme.mainTextColor};
      /* padding-bottom: 15px; */
  }

  div.header {
    display: flex;
    flex-direction: row;
    align-items: center;

    div.product-editor {
      font-size: ${props => props.theme['$font-size-xxxs']};
      font-weight: ${props => props.theme['$weight-bold']};
      color: ${props => props.theme.underlineColor};
      letter-spacing: 1px;
    }

    & > div.price {
      margin-left: 10%;
      width: 10%;
      max-width: 10%;
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

  & > .body {
    display: none;

    & > .description {
      width: 70%;
      max-width: 70%;
    }

    & > .action {
      margin-left: 5%;
      width: 25%;
      max-width: 25%;

      & > button {
        width: 100%;
      }

      & > .hint {
        font-size: 10px;
        @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
          font-size: ${props => props.theme['$font-size-xxxs']};
        }
        font-weight: ${props => props.theme['$weight-regular']};
        letter-spacing: 0.52px;
        line-height: 21px;
        margin-top: 10px;
      }
    }
  }

  & > .body.isOpen{
    display: flex;
  }
`;

const OutOfStock = styled.div`
  color: ${props => props.theme.primaryColor};
  font-size: ${props => props.theme['$font-size-xs']};
  font-weight: ${props => props.theme['$weight-regular']};
`;

const DEFAULT_QUANTITY = 1;

const ME_QUERY = gql`
  query LoadProduct($id: ID!) {
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
  }
`;

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      loadingOrder: false,
      boughtVariant: null,
    }
    this.toggleBody = this.toggleBody.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevState.isOpen && this.state.isOpen && this.props.isLoggedIn) {
      this.setState({
        loadingOrder: true,
      });
      this.props.client.query({
        query: ME_QUERY,
        variables: {
          id: this.props.id,
        }
      }).then(
        ({
          data: {
            me: {
              orders: {
                edges: orderEdges,
              } = {}
            } = {}
          } = {},
          error,
          loading
        }) => {
          this.setState({
            loadingOrder: false,
          });
          this.setState({
            boughtVariant: orderEdges && orderEdges.length > 0?
              orderEdges.reduce((acc, {node: {id: orderId, lines}}) => {
                return {
                  orderId,
                  ...lines.reduce((acc, { id: lineId, variant }) => ({ ...variant, lineId}), {})
                }
              }, {}): null
          })
        }
      )
    }
  }

  toggleBody() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const {
      name,
      editors,
      description,
      isAvailable,
      variants = [],
      saveVariant,
      className,
      currency,
      pageNumber,
      showParentInfo = true,
      parentSection: {
        parentProduct: {
          id: productId,
          name: productName,
          images=[],
          category={},
          editors: productEditors = [],
        }={}
      } = {},
      history: {
        push
      },
    } = this.props;

    const {
      inrPrice: {
        localized: inrLocalized,
      } = {},
      usdPrice: {
        localized: usdLocalized,
      } = {},
    } = variants && variants.length > 0? variants[0]: {};

    const imageUrl = images.reduce((acc, { url } = {}) => url, "");

    const {
      isOpen,
      loadingOrder,
      boughtVariant,
    } = this.state;

    return (
      <ArticleWrapper className={className}>
        <Container className="py-3 px-0">
          <Row onClick={this.toggleBody} className="header">
            <Col xs="9" lg="10">
              <h3 className="title">{name}</h3>
              <span>{getEditorName(editors)}</span>
              {
                pageNumber&&
                <span>&nbsp;&nbsp;{pageNumber}</span>
              }
            </Col>
            <Col xs="3" lg="2" className="d-flex align-items-center justify-content-center">
              <span>{
                getLocalizedAmount({currency, inr: inrLocalized, usd: usdLocalized})
              }</span>
              <FontAwesome className="ml-3" name={`${isOpen ? 'chevron-up' : 'chevron-down'}`} />
            </Col>
          </Row>
          <Row className={`body py-4 ${isOpen ? 'isOpen' : ''}`}>
            <Col lg="4" className="order-lg-2 cart-info ml-lg-auto">
              {
                !isAvailable && this.props.purchasable &&
                  <OutOfStock className="out-of-stock">Out of stock</OutOfStock>
              }
              {
                isAvailable &&
                  <div className="action text-lg-center mb-3">
                    {
                      loadingOrder &&
                        <FontAwesome id="searchIcon" name='spinner' spin className='color-black' />
                    }
                    {
                      !loadingOrder && !boughtVariant &&
                        <RaisedButton onClick={() => saveVariant({ quantity: DEFAULT_QUANTITY, variant: variants[0] })}>
                          Add to cart
                        </RaisedButton>
                    }
                    {
                      !loadingOrder && boughtVariant &&
                        <RaisedButton
                          onClick={
                            (e) => (
                              window.open(`/reader/?order-id=${boughtVariant.orderId}&line-id=${boughtVariant.lineId}`, '_blank')
                            )
                          }>
                          Digital Article: Read now
                        </RaisedButton>
                    }
                    <div className="hint mt-3">This is a digital article. You can read it on the Marg website using any device.</div>
                  </div>
              }
            </Col>
            <Col lg="6" className="description">
              {ReactHtmlParser(description)}
              {
                showParentInfo &&
                <Row>
                  <Col className="col-12 product-heading my-3 ">This article appears in:</Col>
                  <Col onClick={() => push(`/product/${productId}`)} className="col-12 col-md-2">
                    <img
                      alt=""
                      className="img-fluid w-100"
                      src={replaceStaticUrl(imageUrl)}
                    />
                  </Col>
                  <Col className="col-md-8 pl-md-0" onClick={() => push(`/product/${productId}`)}>
                    <div className="product-type mt-3 mt-md-0">{category.name}:</div>
                    <div className="title mt-3 mt-md-0">{productName}</div>
                    <div className="editor-name">Edited by&nbsp;{getEditorName(productEditors)}</div>
                  </Col>
                </Row>
              }
            </Col>
          </Row>
        </Container>
      </ArticleWrapper>
    )
  }
}