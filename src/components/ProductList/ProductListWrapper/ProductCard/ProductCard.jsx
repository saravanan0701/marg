import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { replaceStaticUrl } from './../../../../utils/';

const CardContainer = styled.div`

  cursor: pointer;

  & > div {
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  .name, .meta, .price {
    font-size: 12px;
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      font-size: ${props => props.theme['$font-size-xxs']};
    }
  }

  & > .name {
    color: #000000;
    font-weight: ${props => props.theme['$weight-bold']};
    letter-spacing: 0.66px;
    padding-top: 15px;
  }

  & > .meta {
    color: #000000;
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 0.59px;
    display: flex;
    flex-direction: row;
    padding-top: 5px;
    padding-bottom: 5px;

    & > .spacer {
      margin: 0px 10px;
    }
  }

  & > .price {
    color: #000000;
    font-weight: ${props => props.theme['$weight-regular']};
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
  images,
  editors,
  history: {
    push,
  },
}) => {
  let year;
  const imageUrl = images.reduce((acc, {url}={}) => url, "");
  attributes.forEach((it) => {
    if(it.attribute.slug == 'year') {
      year = it.value.name
    }
  });

  const cardEditors = editors.reduce(
    (acc, {name}={}) => {
      if(name) {
        return acc ? acc + " , " + name: name;
      }
    }, ""
  )

  const openProductDetails = (id) => {
    return push(`/product/${id}`);
  }

  return (
    <CardContainer onClick={(e) => openProductDetails(id)} className={`${className} mb-5`}>
      <img className="img-fluid w-100" src={replaceStaticUrl(imageUrl)} />
      <div className="name">{name}</div>
      <div className="meta">
        <div>{cardEditors}</div>
        {
          cardEditors && year &&
            <div className="spacer">|</div>
        }
        <div>{year}</div>
      </div>
      <div className="price">{currency}.&nbsp;{amount}</div>
    </CardContainer>
  );
};

export default withRouter(ProductCard);