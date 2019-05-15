import React from 'react'
import styled, { css } from 'styled-components';

const ButtonWrapper = styled.div`
  color: ${props => props.theme[props.type? `${props.type}Color`: "primaryColor"]};
  font-family: Lato;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover, &:active {
    color: ${props => props.theme[props.type? `${props.type}HoverColor`: "primaryHoverColor"]};
    ${props => props.type == 'primary' && css`
      border-bottom: 1px solid ${props => props.theme[props.type? `${props.type}HoverUnderLineColor`: "primaryHoverUnderLineColor"]};
    `}
  }
`;

export const FlatButton = (props) => (
  <ButtonWrapper {...props}>
    {props.children}
  </ButtonWrapper>
);
