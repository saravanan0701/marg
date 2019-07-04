import React, { Component } from 'react';
import styled from 'styled-components';

import { Query } from "react-apollo";
import gql from 'graphql-tag';
import ReactHtmlParser from 'react-html-parser';
import { RaisedButton, RadioButtonSet } from './../commons/';
import FontAwesome from 'react-fontawesome';

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
  }
`;

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  & > div.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 0px 15px;

    & > div.title {
      width: 75%;
      max-width: 75%;
      display: flex;
      flex-direction: column;

      & > div.product-title {
        font-size: ${props => props.theme['$font-size-xs']};
        font-weight: ${props => props.theme['$weight-bold']};
        letter-spacing: 0.66px;
        line-height: 23px;
        color: ${props => props.theme.mainTextColor};
        padding-bottom: 15px;
      }

      & > div.product-editor {
        font-size: ${props => props.theme['$font-size-xxxs']};
        font-weight: ${props => props.theme['$weight-bold']};
        color: ${props => props.theme.underlineColor};
        letter-spacing: 1px;
      }
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
        font-size: ${props => props.theme['$font-size-xxxs']};
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
        firstName
        lastName
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
            firstName
            lastName
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

const replaceStaticUrl = (url) => (
  [
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
  ].reduce((url, it) => url.replace(it.key, it.value), url)
)

const getEditorName = (editors) => (
  editors
    .map(({id, firstName, lastName}) => (`${firstName} ${lastName}`))
    .join(',')
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
      addToCart,
    } = this.props;

    const {
      isOpen,
    } = this.state;

    return (
      <ArticleWrapper>
        <div onClick={this.toggleBody} className="header">
          <div className="title">
            <div className="product-title">
              {name}
            </div>
            <div className="product-editor">
              {getEditorName(editors)}
            </div>
          </div>
          <div className="price">
            {currency}&nbsp;{amount}
          </div>
          <div className="icon">
            <FontAwesome name='chevron-down'/>
          </div>
        </div>
        <div className={`body ${isOpen?'isOpen': '' }`}>
          <div className="description">
            {ReactHtmlParser(description)}
          </div>
          <div className="action">
            <RaisedButton
              onClick={
                () =>
                addToCart({
                  quantity: DEFAULT_QUANTITY,
                  variant: variants[0]
                })
              }
              >
              Add to cart
            </RaisedButton>
            <div className="hint">This is a digital article. You can read it on the Marg website using any device.</div>
          </div>
        </div>
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
  addToCart,
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
              description,
              images,
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
          if(loading) {
            return <h1>Loading...</h1>;
          }
          const childProducts = sections.reduce((acc, section) => acc.concat(section.childProducts), []);
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
                  <div className="editor-name">Edited by:&nbsp;{getEditorName(editors)}</div>
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
                              isDigital?
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
                  <RaisedButton
                    onClick={
                      () => addToCart({
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
                    (product) => <Article {...addToCart} key={product.id} {...product} />
                  )
                }
              </div>
            </div> 
          )
        }
      }
    </Query>
  </Wrapper>
};

export default ProductDetails;