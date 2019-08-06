import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import ReactHtmlParser from 'react-html-parser';
import { replaceStaticUrl, getEditorName } from './../../utils/';
import { RaisedButton } from './../commons/';

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  span.fa {
    color: ${props => props.theme['primaryColor']};
    display: block;
  }

  .body {
    display: none;

    & > .cart-info > .out-of-stock {
      text-align: right;
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

  div.header {
    display: flex;
    flex-direction: row;
    align-items: center;
  
    .title {
      font-size: ${props => props.theme['$font-size-xxs']};
      @media (min-with: ${props => props.theme['mobileBreakpoint']}) {
        font-size: ${props => props.theme['$font-size-xs']};
      }
      font-weight: ${props => props.theme['$weight-bold']};
      letter-spacing: 0.66px;
      line-height: 23px;
      color: ${props => props.theme.mainTextColor};
      /* padding-bottom: 15px; */
    }

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

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.toggleBody = this.toggleBody.bind(this);
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
      price: {
        currency,
        amount,
      },
      variants = [],
      saveVariant,
    } = this.props;

    const {
      isOpen,
    } = this.state;

    return (
      <ArticleWrapper>
        <Container className="py-3 px-0">
          <Row onClick={this.toggleBody} className="header">
            <Col xs="9" lg="10">
              <h3 className="title">{name}</h3>
              <span>{getEditorName(editors)}</span>
            </Col>
            <Col xs="3" lg="2" className="d-flex flex-column align-items-center justify-content-center">
              {currency}&nbsp;{amount}
              <FontAwesome name={`${isOpen ? 'chevron-up' : 'chevron-down'}`} />
            </Col>
          </Row>
          <Row className={`body py-4 ${isOpen ? 'isOpen' : ''}`}>
            <Col lg="4" className="order-lg-2 cart-info">
              {
                !isAvailable &&
                  <OutOfStock className="out-of-stock">Out of stock</OutOfStock>
              }
              {
                isAvailable &&
                  <div className="action text-lg-center mb-3">
                    <RaisedButton onClick={() => saveVariant({ quantity: DEFAULT_QUANTITY, variant: variants[0] })}>
                      Add to cart
                    </RaisedButton>
                    <div className="hint mt-3">This is a digital article. You can read it on the Marg website using any device.</div>
                  </div>
              }
            </Col>
            <Col lg="8" className="description">
              {ReactHtmlParser(description)}
            </Col>
          </Row>
        </Container>
      </ArticleWrapper>
    )
  }
}