import React, { Component } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`

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


export const ProductCard = ({
  name,
  price: {
    amount,
    currency,
  },
  attributes,
  className,
  thumbnailUrl,
}) => {
  let editor, year;
  attributes.forEach((it) => {
    if(it.attribute.name == 'Editor') {
      editor = it.value.name
    }
    if(it.attribute.name == 'Year') {
      year = it.value.name
    }
  });

  const replaceStaticUrl = (url) => (
    url
      && url.replace('static', 'backend-static')
      && url.replace('media', 'backend-media')
  );

  return (
    <CardContainer className={`${className} `}>
      <img
        src={replaceStaticUrl(thumbnailUrl)}
        />
      <div className="name">{name}</div>
      <div className="meta">
        <div>{editor}</div>
        <div className="spacer">|</div>
        <div>{year}</div>
      </div>
      <div className="price">{currency}.&nbsp;{amount}</div>
    </CardContainer>
  );
};