import React, { Component } from 'react';
import styled from 'styled-components';

import { Query } from "react-apollo";
import gql from 'graphql-tag';
import ReactHtmlParser from 'react-html-parser';
import { RaisedButton, RadioButtonSet } from './../commons/';
import FontAwesome from 'react-fontawesome';
import { replaceStaticUrl } from './../../utils/';
import { Container, Row, Col } from 'reactstrap';


const Wrapper = styled.div`

  @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
    padding: 50px 100px 100px;
  }

  .name {
    font-family: "Cormorant Garamond Medium";
    font-size: ${props => props.theme['$font-size-sm']};
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      font-size: ${props => props.theme['$font-size-lg']};
    }
    font-weight: ${props => props.theme['$weight-regular']};
    font-weight: 500;
    letter-spacing: 1px;
    margin-top: 20px;
  }

  .editor-name {
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 1px;
    line-height: 28px;
    margin-bottom: 1.5rem;
  }

  .out-of-stock {
    color: ${props => props.theme.primaryColor};
    font-size: ${props => props.theme['$font-size-xs']};
    font-weight: ${props => props.theme['$weight-regular']};
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
    /* width: 60%; */
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

  /* & > .product-details {
    
    display: flex;
    flex-direction: column;

    & > .details {
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
        flex-direction: column; */

        /* & > .name {
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

        & > .pricing {
          width: 60%;
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
  } */
`;

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
      price{
        currency
        amount
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
        name
      }
      sections{
        childProducts{
          id
          name
          description
          price{
            currency
            amount
          }
          editors {
            id
            name
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


const getEditorName = (editors) => (
  editors
    .reduce(({ acc, name }) => {
      if(name) {
        return acc + ", " + name
      }
      return acc;
    }, "")
);

const DEFAULT_QUANTITY = 1;

class Article extends Component {
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
            <Col lg="4" className="order-lg-2">
              <div className="action text-lg-center mb-3">
                <RaisedButton onClick={() => saveVariant({ quantity: DEFAULT_QUANTITY, variant: variants[0] })}>
                  Add to cart
                </RaisedButton>
                <div className="hint mt-3">This is a digital article. You can read it on the Marg website using any device.</div>
              </div>
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

  const deleteAll = () => {
    client.query({
      query: GET_PRODS,
      variables: {
        first: 100
      }
    }).then(
      ({data: { products: { totalCount, edges } }}) => {
        edges.forEach(
          ({node: {id}}) => {
              client.mutate({
                mutation: DEL_PRODUCT,
                variables: {
                  id
                }
              })
          }
        )
        if(totalCount > 0) {
          deleteAll()
        }
      }
    )
  }

  // deleteAll();
  // TODO: REMOVE fter migrations are stable...

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
              thumbnail: {
                url: thumbnailUrl
              } = {},
              price: {
                currency,
                amount,
              } = {},
              attributes,
              editors,
              sections,
              variants = [],
            } = {},
          },
        }) => {
          if (loading) {
            return <h1>Loading...</h1>;
          }

          const childProducts = sections.reduce((acc, section) => acc.concat(section.childProducts), []);
          return (

            <Container>
              <Row className="my-5">
                <Col className="text-lg-center" lg="6">
                  <img
                    className="img-fluid"
                    src={images && images.length > 0 ? replaceStaticUrl(images[0].url) : replaceStaticUrl(thumbnailUrl)}
                  />
                </Col>
                <Col className="details" lg="6">
                  <div>{volumeInfo}</div>
                  <div className="name">{name}</div>
                  {
                    getEditorName(editors) && 
                      <div className="editor-name">Edited by:&nbsp;{getEditorName(editors)}</div>
                  }
                  {
                    !isAvailable &&
                      <div className="out-of-stock">Out of stock</div>
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
                        (product) => <Article {...saveVariant} key={product.id} {...product} />
                      )
                    }
                  </div>
                </Col>
              </Row>
              <div className="product-details d-none">
                <div className="details">
                  <div className="image-container">
                    <img
                      src={images && images.length > 0 ? replaceStaticUrl(images[0].url) : replaceStaticUrl(thumbnailUrl)}
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
                      (product) => <Article {...saveVariant} key={product.id} {...product} />
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