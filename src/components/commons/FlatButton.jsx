import React from 'react'
import styled, { css } from 'styled-components';

const ButtonWrapper = styled.div`
  color: ${props => props.theme[props.colorType? `${props.colorType}Color`: "primaryColor"]};
  font-size: ${props => props.theme['$font-size-xxxs']};
  font-weight: ${props => props.theme['$weight-bold']};
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;
  border-bottom: 1px solid transparent;

  &:disabled {
    background-color: #cccccc;
  }

  a:hover, a:active {
    color: ${props => props.theme[props.colorType? `${props.colorType}HoverColor`: "primaryHoverColor"]};
    ${props => props.theme[`${props.colorType}HoverUnderLineColor`] !== undefined && css`
      border-bottom: 1px solid ${props => props.theme[props.colorType? `${props.colorType}HoverUnderLineColor`: "primaryHoverUnderLineColor"]};
    `}
  }
`;

const FlatButton = (props) => (
  <ButtonWrapper {...props}>
    {props.children}
  </ButtonWrapper>
);

export default FlatButton;