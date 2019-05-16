import React from 'react'
import styled, { css } from 'styled-components';

const ButtonWrapper = styled.div`
  color: ${props => props.theme[props.type? `${props.type}Color`: "primaryColor"]};
  font-size: ${props => props.theme['$font-size-xxs']};
  font-weight: ${props => props.theme['$weight-bold']};
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover, &:active {
    color: ${props => props.theme[props.type? `${props.type}HoverColor`: "primaryHoverColor"]};
    ${props => props.theme[`${props.type}HoverUnderLineColor`] !== undefined && css`
      border-bottom: 1px solid ${props => props.theme[props.type? `${props.type}HoverUnderLineColor`: "primaryHoverUnderLineColor"]};
    `}
  }
`;

export const FlatButton = (props) => (
  <ButtonWrapper {...props}>
    {props.children}
  </ButtonWrapper>
);
