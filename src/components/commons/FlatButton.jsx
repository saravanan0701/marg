import React from 'react'
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  color: #ec1d24;
  font-family: Lato;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover,&:active {
    border-bottom: 1px solid #ec1d24;
  }
`;

export const FlatButton = (props) => (
  <ButtonWrapper {...props}>
    {props.children}
  </ButtonWrapper>
);