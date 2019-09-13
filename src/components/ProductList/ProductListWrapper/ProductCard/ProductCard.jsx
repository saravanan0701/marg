import React, { Component } from "react";
import styled from "styled-components";
import {
  replaceStaticUrl,
  getEditorName,
  getLocalizedAmount
} from "./../../../../utils/";

const CardContainer = styled.div`
  cursor: pointer;

  & > div {
    @media (min-width: ${props => props.theme["mobileBreakpoint"]}) {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  .name,
  .meta,
  .price {
    font-size: 12px;
    @media (min-width: ${props => props.theme["mobileBreakpoint"]}) {
      font-size: ${props => props.theme["$font-size-xxs"]};
    }
  }

  & > .name {
    color: #000000;
    font-weight: ${props => props.theme["$weight-bold"]};
    letter-spacing: 0.66px;
    padding-top: 15px;
  }

  & > .meta {
    color: #000000;
    font-weight: ${props => props.theme["$weight-regular"]};
    letter-spacing: 0.59px;
    display: flex;
    flex-direction: row;
    padding-top: 5px;
    padding-bottom: 5px;

    & > .spacer {
      margin: 0px 10px;
    }
  }

  .price,
  .year {
    font-size: 14px;
    color: #808080;
  }
`;

export default ({
  id,
  name,
  variants,
  attributes,
  className,
  thumbnailUrl,
  images,
  editors,
  history: { push },
  currency
}) => {
  let year;
  const imageUrl = images.reduce((acc, { url } = {}) => url, "");
  attributes.forEach(it => {
    if (it.attribute.slug == "year") {
      year = it.value.name;
    }
  });

  const cardEditors = getEditorName(editors);

  const openProductDetails = id => {
    return push(`/product/${id}`);
  };

  // const localizedAmount = currency === "INR"? localizedInr: localizedUsd;
  const { digitalPrice, printablePrice } = variants.reduce(
    (acc, { inrPrice, usdPrice, isDigital }) => {
      const { localized: localizedInr } = inrPrice;
      const { localized: localizedUsd } = usdPrice;
      const localizedAmount = getLocalizedAmount({
        currency,
        inr: localizedInr,
        usd: localizedUsd
      });
      if (isDigital) {
        acc.digitalPrice = localizedAmount;
      } else {
        acc.printablePrice = localizedAmount;
      }
      return acc;
    },
    {}
  );

  return (
    <CardContainer
      onClick={e => openProductDetails(id)}
      className={`${className} mb-5`}
    >
      <img
        alt=""
        className="img-fluid w-100"
        src={replaceStaticUrl(imageUrl)}
      />
      <div className="name">{name}</div>
      <div className="meta">
        <div>{cardEditors}</div>
      </div>
      <div className="meta">
        <div className="year d-block">{year}</div>
      </div>
      <div className="price">
        {printablePrice && <span>{printablePrice}</span>}
        {digitalPrice && printablePrice && <span>&nbsp;/&nbsp;</span>}
        {digitalPrice && <span>{digitalPrice}</span>}
      </div>
    </CardContainer>
  );
};
