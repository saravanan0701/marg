import styled from "styled-components";

const ImgContainer = styled.div `
  img {
    max-height: 256px;
    cursor: pointer;
  }
`;

const NameContainer = styled.div `

  display: flex;
  flex-direction: column;

  .main-name {
    color: #000000;
    font-family: Lato;
    font-size: 16px;
    font-weight: 700;

    cursor: pointer;

    @media (min-width: 768px) {
      font-size: 18px;
      line-height: 23px;
    }

  }

  .sub-heading {
    color: #3a3a3a;
    font-family: Lato;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.59px;

    @media (min-width: 768px) {
      font-size: 18px;
      line-height: 23px;
    }

  }
`;

const LinePrice = styled.div `
  /* text-align: right; */
  color: #000000;
  font-family: Lato;
  font-size: 14px;
  font-weight: 700;

  @media (min-width: 768px) {
      font-size: 18px;
      line-height: 23px;
    }

`;

const PriceContainer = styled.div `
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: ${props => props.theme.underlineColor} solid 1px;
  & > div.price-details {
    text-align: right;
  }
`;

const ActionButton = styled.div `
  padding-bottom: 10px;
  & > .button-wrapper {
    padding-right: 0px;
  }
`;

const OrderLine = styled.div `
  border-bottom: 1px solid #9d9d9d;
  max-width: 900px;
`;

const ActionsContainer = styled.div `
  display: flex;
  
  .delete-item {
    cursor: pointer;
    color: #ec1d24;
    font-family: Lato;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.7px;
    /* line-height: 34px; */
    text-transform: uppercase;
  }

`;

export {
  OrderLine,
  ImgContainer,
  LinePrice,
  NameContainer,
  ActionsContainer
}