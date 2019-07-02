import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';

const URI = `${process.env.REACT_APP_BACKEND_URL}/`;

const CardContainer = styled.div`

  cursor: pointer;

  & > img {
    width: 100%;
    height: 70%;
    object-fit: cover;
    object-position: top;
  }

  & > div {
    padding-left: 10px;
    padding-right: 10px;
  }

  & > .name {
    color: #000000;
    font-size: ${props => props.theme['$font-size-xs']};
    font-weight: ${props => props.theme['$weight-bold']};
    letter-spacing: 0.66px;
    line-height: 20px;
    min-height: 60px;
    padding-top: 15px;
  }

  & > .meta {
    color: #000000;
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 0.59px;
    line-height: 23px;
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;

    & > .spacer {
      margin: 0px 10px;
    }
  }

  & > .price {
    color: #000000;
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 0.59px;
    line-height: 23px;
  }
`;


const ProductCard = ({
  id,
  name,
  price: {
    amount,
    currency,
  },
  attributes,
  className,
  thumbnailUrl,
  editors,
  history: {
    push,
  },
}) => {
  let year;
  attributes.forEach((it) => {
    if(it.attribute.slug == 'year') {
      year = it.value.name
    }
  });

  const cardEditors = editors.map(({firstName, lastName}) => `${firstName} ${lastName}`).join(", ")

  const replaceStaticUrl = (url) => {
    const replaceExps = [
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
    ];
    return replaceExps.reduce((url, it) => url.replace(it.key, it.value), url);
  }

  const openProductDetails = (id) => {
    return push(`/product/${id}`);
  }

  return (
    <CardContainer onClick={(e) => openProductDetails(id)} className={`${className} `}>
      <img
        src={replaceStaticUrl(thumbnailUrl)}
        />
      <div className="name">{name}</div>
      <div className="meta">
        <div>{cardEditors}</div>
        <div className="spacer">|</div>
        <div>{year}</div>
      </div>
      <div className="price">{currency}.&nbsp;{amount}</div>
    </CardContainer>
  );
};

export default withRouter(ProductCard);